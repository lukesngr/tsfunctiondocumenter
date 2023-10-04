import * as vscode from 'vscode';

export default function outputDocToNewEditorTab(documentation: string): void {
    const doc = vscode.workspace.openTextDocument({ content: documentation, language: 'javascript' });
    doc.then(document => {
        vscode.window.showTextDocument(document);
    });
}
