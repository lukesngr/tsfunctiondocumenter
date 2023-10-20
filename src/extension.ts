import * as vscode from 'vscode';
import OpenAI from "./ModelQuerier";
import outputDocToNewEditorTab from './outputDocToNewEditorTab';
import getCodeFromOpenWindow from './getCodeFromOpenWindow';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "tsfunctiondocumenter" is now active!');

    let config = vscode.workspace.getConfiguration('tsfunctiondocumenter');
    let apiKey: string | undefined = config.apiKey;
    
    if (!apiKey) {
        vscode.window.showErrorMessage("API Key for tsfunctiondocumenter is not set. Please set it in vscode settings");
        return;
    }

    const openAI = new OpenAI(apiKey);

    let disposable = vscode.commands.registerCommand('tsfunctiondocumenter.documentPageFunctions', async () => {
        try {
            let question = "Can you document the following in a manner acceptable for JsDoc";
            let code = getCodeFromOpenWindow();

            if (!code) {
                vscode.window.showWarningMessage("No code found or selected in the open window.");
                return;
            }

            let author: string | undefined = vscode.workspace.getConfiguration('tsfunctiondocumenter').author;

            if (!author) {
                vscode.window.showErrorMessage("Author for tsfunctiondocumenter is not set. Please set it in vscode settings");
            }else{
                question = question+" and add a author field with name "+author;
            }

            const documentation = await openAI.queryModel(code, question);
            outputDocToNewEditorTab(documentation);
            
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage("An error occurred while documenting the functions. Please ");
        }
    });

    vscode.commands.registerCommand('tsfunctiondocumenter.toDocumentationHTML', async () => {
        try {
            let question = "Can you create a jsdoc style html page from the following code";
            let code = getCodeFromOpenWindow();

            if (!code) {
                vscode.window.showWarningMessage("No code found or selected in the open window.");
                return;
            }

            let author: string | undefined = vscode.workspace.getConfiguration('tsfunctiondocumenter').author;

            if (!author) {
                vscode.window.showErrorMessage("Author for tsfunctiondocumenter is not set. Please set it in vscode settings");
            }else{
                question = question+" and add a author field with name "+author;
            }

            const html = await openAI.queryModel(code, question);
            outputDocToNewEditorTab(html);
            
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage("An error occurred while documenting the functions. Please ");
        }
    });

    vscode.commands.registerCommand('tsfunctiondocumenter.bigOApprox', async () => {
        try {
            let question = "Can you make a big O approximation of this code and return only the O notation?";
            let code = getCodeFromOpenWindow();

            if (!code) {
                vscode.window.showWarningMessage("No code found or selected in the open window.");
                return;
            }

            const oNotation = await openAI.queryModel(code, question);
            vscode.window.showInformationMessage(oNotation);
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage("An error occurred while documenting the functions. Please ");
        }
    });


    context.subscriptions.push(disposable);
}

export function deactivate() {}