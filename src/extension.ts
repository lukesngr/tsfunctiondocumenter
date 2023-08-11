import * as vscode from 'vscode';
import OpenAI from "./openai/ModelQuerier"
import * as dotenv from 'dotenv';
dotenv.config();
const openAI = new OpenAI("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");

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "tsfunctiondocumenter" is now active!');

	let disposable = vscode.commands.registerCommand('tsfunctiondocumenter.helloWorld', async () => {
		await openAI.documentFunction("function printHello(): void {console.log('Hello!');}")
		.then(text => {
			vscode.window.showInformationMessage(text);
			console.log(text);
		})
		.catch(error => {
			console.log(error);
		})
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
