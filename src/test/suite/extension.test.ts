import * as vscode from 'vscode';
import * as path from 'path';
import * as assert from 'assert';
import getCodeFromOpenWindow from '../../getCodeFromOpenWindow';
import outputDocToNewEditorTab from '../../outputDocToNewEditorTab';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    const testFilePath = path.resolve(__dirname, '.', 'sample.txt');

    test('getCodeFromOpenWindow Test', async () => {
        const document = await vscode.workspace.openTextDocument(testFilePath);
        const editor = await vscode.window.showTextDocument(document);

        let code = getCodeFromOpenWindow();
        assert.strictEqual(code, document.getText(), 'Full document text should be returned when no selection is present');

        const startPosition = new vscode.Position(0, 0);
        const endPosition = new vscode.Position(0, 5);
        const newSelection = new vscode.Selection(startPosition, endPosition);
        editor.selection = newSelection;

        code = getCodeFromOpenWindow();
        assert.strictEqual(code, document.getText(newSelection), 'Selected text should be returned');
    });

	test('outputDocToNewEditorTab Test', async () => {
        try {
            const mockDocumentation = "This is a mock documentation string.";
            await outputDocToNewEditorTab(mockDocumentation);

            assert.ok(true);

        } catch (error) {
            assert.ok(false, `Error occurred: ${error.message}`);
        }
    });
});