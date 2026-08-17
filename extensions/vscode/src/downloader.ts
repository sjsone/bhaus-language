import * as vscode from 'vscode';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export interface DownloadProgress {
	bytesDownloaded: number;
	totalBytes: number;
}

export async function downloadFile(
	url: string,
	destPath: string,
	onProgress?: (progress: DownloadProgress) => void
): Promise<void> {
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(destPath);

		const request = https.get(url, (response) => {
			// Handle redirects
			if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
				file.close();
				downloadFile(response.headers.location, destPath, onProgress)
					.then(resolve)
					.catch(reject);
				return;
			}

			if (response.statusCode !== 200) {
				file.close();
				fs.unlink(destPath, () => { });
				reject(new Error(`Failed to download: HTTP ${response.statusCode}`));
				return;
			}

			const totalBytes = parseInt(response.headers['content-length'] || '0', 10);
			let bytesDownloaded = 0;

			response.on('data', (chunk: Buffer) => {
				bytesDownloaded += chunk.length;
				if (onProgress && totalBytes > 0) {
					onProgress({ bytesDownloaded, totalBytes });
				}
			});

			response.pipe(file);
		});

		request.on('error', (err) => {
			file.close();
			fs.unlink(destPath, () => { });
			reject(err);
		});

		file.on('finish', () => {
			file.close();
			resolve();
		});

		file.on('error', (err) => {
			file.close();
			fs.unlink(destPath, () => { });
			reject(err);
		});
	});
}

export function getPlatformExeName(): string {
	const platform = process.platform;
	const arch = process.arch;

	let ext = '';
	if (platform === 'win32') {
		ext = '.exe';
	}

	let platformStr = '';
	if (platform === 'darwin') {
		platformStr = 'darwin';
	} else if (platform === 'linux') {
		platformStr = 'linux';
	} else if (platform === 'win32') {
		platformStr = 'windows';
	}

	let archStr = '';
	if (arch === 'x64') {
		archStr = 'x64';
	} else if (arch === 'arm64') {
		archStr = 'arm64';
	}

	return `bhaus-ls-${platformStr}-${archStr}${ext}`;
}

export function getStoragePath(extensionPath: string): string {
	return path.join(extensionPath, 'bin');
}

export function getLanguageServerPath(extensionPath: string): string {
	const binPath = getStoragePath(extensionPath);
	const exeName = process.platform === 'win32' ? 'bhaus-ls.exe' : 'bhaus-ls';
	return path.join(binPath, exeName);
}

export function languageServerExists(extensionPath: string): boolean {
	const serverPath = getLanguageServerPath(extensionPath);
	return fs.existsSync(serverPath);
}

export async function downloadLanguageServer(
	extensionPath: string,
	releaseTag: string,
	repo: string,
	onProgress?: (progress: DownloadProgress) => void
): Promise<string> {
	const exeName = getPlatformExeName();
	const releaseUrl = releaseTag === 'latest'
		? `https://api.github.com/repos/${repo}/releases/latest`
		: `https://api.github.com/repos/${repo}/releases/tags/${releaseTag}`;

	// Fetch release info
	const releaseInfo = await fetchReleaseInfo(releaseUrl);

	// Find the asset
	const asset = releaseInfo.assets?.find((a: { name: string }) => a.name === exeName);
	if (!asset) {
		throw new Error(`No release found for ${exeName}. Available: ${releaseInfo.assets?.map((a: { name: string }) => a.name).join(', ')}`);
	}

	// Download
	const binPath = getStoragePath(extensionPath);
	if (!fs.existsSync(binPath)) {
		fs.mkdirSync(binPath, { recursive: true });
	}

	const destPath = getLanguageServerPath(extensionPath);

	vscode.window.showInformationMessage(`Downloading BHaus language server...`);

	await downloadFile(asset.browser_download_url, destPath, onProgress);

	// Make executable on Unix
	if (process.platform !== 'win32') {
		fs.chmodSync(destPath, 0o755);
	}

	return destPath;
}

async function fetchReleaseInfo(url: string): Promise<any> {
	return new Promise((resolve, reject) => {
		const request = https.get(url, {
			headers: {
				'User-Agent': 'VSCode-BHaus-Extension',
				'Accept': 'application/vnd.github+json',
			},
		}, (response) => {
			let data = '';
			response.on('data', (chunk) => data += chunk);
			response.on('end', () => {
				try {
					resolve(JSON.parse(data));
				} catch (e) {
					reject(new Error('Failed to parse release info'));
				}
			});
		});
		request.on('error', reject);
	});
}

export async function showDownloadPrompt(
	extensionPath: string,
	onDownload: () => Promise<void>
): Promise<string | null> {
	const action = await vscode.window.showInformationMessage(
		'The BHaus language server is required for full language features.',
		{
			modal: true,
		},
		'Download',
		'Set Path Manually',
		'Cancel'
	);

	if (action === 'Download') {
		try {
			await onDownload();
			return getLanguageServerPath(extensionPath);
		} catch (error) {
			vscode.window.showErrorMessage(`Failed to download: ${error}`);
			return null;
		}
	} else if (action === 'Set Path Manually') {
		vscode.commands.executeCommand('workbench.action.openSettings', 'bhaus.languageServerPath');
		return null;
	}

	return null;
}
