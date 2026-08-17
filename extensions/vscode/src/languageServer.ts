import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import {
	getConfig,
} from './config';
import {
	languageServerExists,
	downloadLanguageServer,
	getLanguageServerPath,
	showDownloadPrompt,
	DownloadProgress,
} from './downloader';

export interface LanguageServerResult {
	command: string;
	args: string[];
}

export async function resolveLanguageServer(
	extensionPath: string
): Promise<LanguageServerResult | null> {
	const config = getConfig();

	// 1. Check if user provided a manual path
	if (config.languageServerPath && config.languageServerPath.trim() !== '') {
		const manualPath = config.languageServerPath;
		if (fs.existsSync(manualPath)) {
			// vscode.window.showInformationMessage(`Using custom language server: ${manualPath}`);
			return {
				command: manualPath,
				args: ['ls'],
			};
		} else {
			vscode.window.showWarningMessage(
				`Configured language server not found: ${manualPath}. Will try to download.`
			);
		}
	}

	console.log("config.languageServerPath", config.languageServerPath)

	// 2. Check if we have a downloaded language server
	if (languageServerExists(extensionPath)) {
		const serverPath = getLanguageServerPath(extensionPath);
		return {
			command: serverPath,
			args: ['ls'],
		};
	}

	// 3. Try to download from GitHub
	const releaseTag = config.releaseTag || 'latest';
	const releaseRepo = config.releaseRepo || 'bhaus/language-server';

	// Show progress during download
	const result = await showDownloadPrompt(extensionPath, async () => {
		await vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: 'Downloading BHaus Language Server',
				cancellable: false,
			},
			async (progress) => {
				await downloadLanguageServer(
					extensionPath,
					releaseTag,
					releaseRepo,
					(p: DownloadProgress) => {
						const percent = Math.round((p.bytesDownloaded / p.totalBytes) * 100);
						progress.report({ message: `${percent}%` });
					}
				);
			}
		);
	});

	if (result) {
		return {
			command: result,
			args: ['ls'],
		};
	}

	vscode.window.showWarningMessage(
		'BHaus language server not available. Some features may not work.'
	);

	return null;
}
