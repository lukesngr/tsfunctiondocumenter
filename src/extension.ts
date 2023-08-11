import * as vscode from 'vscode';
import OpenAI from "./openai/ModelQuerier"
import * as dotenv from 'dotenv';
dotenv.config();
const openAI = new OpenAI("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");
const testFunction = "function printHello(): void {console.log('Hello!');}"

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "tsfunctiondocumenter" is now active!');

	let disposable = vscode.commands.registerCommand('tsfunctiondocumenter.helloWorld', async () => {
		await openAI.documentFunction(testFunction)
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
