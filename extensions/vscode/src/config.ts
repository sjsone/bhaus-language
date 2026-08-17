import * as vscode from 'vscode';

export interface Config {
	languageServerPath: string | undefined;
	releaseTag: string;
	releaseRepo: string;
	downloadUrl: string;
}

const DEFAULT_RELEASE_TAG = 'latest';
const DEFAULT_RELEASE_REPO = 'bhaus/language-server';

export function getConfig(): Config {
	const config = vscode.workspace.getConfiguration('bhaus');

	return {
		languageServerPath: config.get<string>('languageServerPath'),
		releaseTag: config.get<string>('releaseTag') ?? DEFAULT_RELEASE_TAG,
		releaseRepo: config.get<string>('releaseRepo') ?? DEFAULT_RELEASE_REPO,
		downloadUrl: config.get<string>('downloadUrl') ?? '',
	};
}

export function getExtensionConfig(): Config {
	const extension = vscode.extensions.getExtension('bhaus.bhaus');
	if (!extension) {
		return getConfig();
	}

	return {
		languageServerPath: extension.packageJSON?.contributes?.configuration?.properties?.['bhaus.languageServerPath']?.default as string | undefined,
		releaseTag: extension.packageJSON?.bhaus?.releaseTag ?? DEFAULT_RELEASE_TAG,
		releaseRepo: extension.packageJSON?.bhaus?.releaseRepo ?? DEFAULT_RELEASE_REPO,
		downloadUrl: extension.packageJSON?.bhaus?.downloadUrl ?? '',
	};
}
