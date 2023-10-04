import * as vscode from 'vscode';

export default function getCodeFromOpenWindow(): string | null {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null;
    }

    const selection = editor.selection;
    const text = selection.isEmpty ? editor.document.getText() : editor.document.getText(selection);

    return text;
}
