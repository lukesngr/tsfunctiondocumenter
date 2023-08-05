import * as vscode from 'vscode';
import OpenAI from "./openai/OpenAiWrapper"
import * as dotenv from 'dotenv';
dotenv.config();
const openAI = new OpenAI(process.env.API_KEY);
const model = 'text-davinci-003';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tsfunctiondocumenter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tsfunctiondocumenter.helloWorld', async () => {
		await openAI.generateText("Write three random words", model, 200)
		.then(text => {
			vscode.window.showInformationMessage(text);
		})
		.catch(error => {
			console.log(error);
		})
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
