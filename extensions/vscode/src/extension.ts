import * as vscode from 'vscode';
import { resolveLanguageServer } from './languageServer';
import { startLanguageServer, stopLanguageServer } from './client';

export function activate(context: vscode.ExtensionContext) {
	const extensionPath = context.extensionPath;

	// Resolve language server (download if needed)
	resolveLanguageServer(extensionPath).then((server) => {
		if (server) {
			startLanguageServer(server, context).catch((err) => {
				vscode.window.showErrorMessage(`Failed to start language server: ${err}`);
			});
		}
	}).catch((err) => {
		vscode.window.showErrorMessage(`Failed to resolve language server: ${err}`);
	});

	// Register commands
	context.subscriptions.push(
		vscode.commands.registerCommand('bhaus.downloadLanguageServer', async () => {
			// Trigger re-resolution
			const server = await resolveLanguageServer(extensionPath);
			if (server) {
				await stopLanguageServer();
				await startLanguageServer(server, context);
			}
		})
	);
}

export function deactivate() {
	return stopLanguageServer();
}
