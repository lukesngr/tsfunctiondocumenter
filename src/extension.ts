import * as vscode from 'vscode';
import OpenAI from "./ModelQuerier";
import outputDocToNewEditorTab from './outputDocToNewEditorTab';
import getCodeFromOpenWindow from './getCodeFromOpenWindow';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "tsfunctiondocumenter" is now active!');

    let config = vscode.workspace.getConfiguration('tsfunctiondocumenter');
    let apiKey: string | undefined = config.apiKey;
    
    if (!apiKey) {
        vscode.window.showErrorMessage("API Key for tsfunctiondocumenter is not set!");
        return;
    }

    const openAI = new OpenAI(apiKey);

    let disposable = vscode.commands.registerCommand('tsfunctiondocumenter.documentPageFunctions', async () => {
        try {
            let code = getCodeFromOpenWindow();
            const documentation = await openAI.documentFunction(code);
            outputDocToNewEditorTab(documentation);
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage("An error occurred while documenting the functions.");
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}