import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node';
import { LanguageServerResult } from './languageServer';

let client: LanguageClient | null = null;

export function createLanguageClient(server: LanguageServerResult): LanguageClient {
	const serverOptions: ServerOptions = {
		run: {
			command: server.command,
			args: server.args,
		},
		debug: {
			command: server.command,
			args: server.args,
		},
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [
			{ scheme: 'file', language: 'bhaus' }
		],
		synchronize: {
			fileEvents: vscode.workspace.createFileSystemWatcher('**/*.bhaus')
		},
	};

	return new LanguageClient('bhaus', 'BHaus Language Server', serverOptions, clientOptions);
}

export async function startLanguageServer(
	server: LanguageServerResult,
	context: vscode.ExtensionContext
): Promise<LanguageClient> {
	client = createLanguageClient(server);

	context.subscriptions.push(client);

	await client.start();

	vscode.window.showInformationMessage('BHaus language server started');

	return client;
}

export function getClient(): LanguageClient | null {
	return client;
}

export async function stopLanguageServer(): Promise<void> {
	if (client) {
		await client.stop();
		client = null;
	}
}
