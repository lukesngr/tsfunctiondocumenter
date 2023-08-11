import * as vscode from 'vscode';
import OpenAI from "./ModelQuerier"
require("dotenv").config();
import outputDocToNewEditorTab from './outputDocToNewEditorTab';
import getCodeFromOpenWindow from './getCodeFromOpenWindow';

const openAI = new OpenAI("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");

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "tsfunctiondocumenter" is now active!');
	console.log(process.env.APIKEY)

	let disposable = vscode.commands.registerCommand('tsfunctiondocumenter.documentPageFunctions', async () => {
		let code = getCodeFromOpenWindow();
		/*await openAI.documentFunction(code)
		.then(documentation => {
			outputDocToNewEditorTab(documentation);
		})
		.catch(error => {
			console.log(error);
		})*/
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
