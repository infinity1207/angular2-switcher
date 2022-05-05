import * as vscode from 'vscode';
import { fileIs, getFileNameWithoutExtension } from "./common";
import { TemplateDefinitionProvider } from "./template-definition-provider";

let previous = "";
let openSideBySide = vscode.workspace.getConfiguration("angular2-switcher").get<boolean>("openSideBySide")!;
let reuseView = vscode.workspace.getConfiguration("angular2-switcher").get<boolean>("reuseView")!;
let styleFormats = vscode.workspace.getConfiguration("angular2-switcher").get<string[]>("styleFormats")!;
let templateFormats = vscode.workspace.getConfiguration("angular2-switcher").get<string[]>("templateFormats")!;
let specFormats = vscode.workspace.getConfiguration("angular2-switcher").get<string[]>("specFormats")!;

export function activate(context: vscode.ExtensionContext) {
    let switchTemplateCommand = vscode.commands.registerCommand('extension.switchTemplate', switchTemplate);
    context.subscriptions.push(switchTemplateCommand);

    let switchTsCommand = vscode.commands.registerCommand('extension.switchTs', switchTs);
    context.subscriptions.push(switchTsCommand);

    let switchStyleCommand = vscode.commands.registerCommand('extension.switchStyle', switchStyle);
    context.subscriptions.push(switchStyleCommand);

    let switchSpecCommand = vscode.commands.registerCommand('extension.switchSpec', switchSpec);
    context.subscriptions.push(switchSpecCommand);

    templateFormats.forEach((f) => {
        if (f.startsWith('.')) {
            f = f.slice(1);
        }
        let filter: vscode.DocumentFilter = { language: f, scheme: "file" };
        context.subscriptions.push(vscode.languages.registerDefinitionProvider(filter, new TemplateDefinitionProvider()));
    });
}

export function deactivate() { }

async function switchTemplate() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    let currentFile = editor.document.fileName;
    let fileNameWithoutExtension = getFileNameWithoutExtension(currentFile);

    if (fileIsTs(currentFile) || fileIsStyle(currentFile) || fileIsSpec(currentFile)) {
        openCorrespondingFile(fileNameWithoutExtension, ...templateFormats);
    }
    else if (fileIsTemplate(currentFile)) {
        if (previous && previous !== currentFile) {
            if (previous.startsWith(fileNameWithoutExtension)) {
                openFile(previous);
            } else {
                openCorrespondingFile(fileNameWithoutExtension, ".ts");
            }
        } else {
            openCorrespondingFile(fileNameWithoutExtension, ".ts");
        }
    }
}

async function switchTs() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    let currentFile = editor.document.fileName;
    let fileNameWithoutExtension = getFileNameWithoutExtension(currentFile);

    if (fileIsStyle(currentFile) || fileIsTemplate(currentFile) || fileIsSpec(currentFile)) {
        openCorrespondingFile(fileNameWithoutExtension, ".ts");
    }
    else if (fileIsTs(currentFile)) {
        if (previous && previous !== currentFile) {
            if (previous.startsWith(fileNameWithoutExtension)) {
                openFile(previous);
            } else {
                openCorrespondingFile(fileNameWithoutExtension, ...templateFormats);
            }
        } else {
            openCorrespondingFile(fileNameWithoutExtension, ...templateFormats);
        }
    }
}

async function switchStyle() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    let currentFile = editor.document.fileName;
    let fileNameWithoutExtension = getFileNameWithoutExtension(currentFile);

    if (fileIsTs(currentFile) || fileIsTemplate(currentFile) || fileIsSpec(currentFile)) {
        openCorrespondingFile(fileNameWithoutExtension, ...styleFormats);
    }
    else if (fileIsStyle(currentFile)) {
        if (previous && previous !== currentFile) {
            if (previous.startsWith(fileNameWithoutExtension)) {
                openFile(previous);
            } else {
                openCorrespondingFile(fileNameWithoutExtension, ...templateFormats);
            }
        } else {
            openCorrespondingFile(fileNameWithoutExtension, ...templateFormats);
        }
    }
}

async function switchSpec() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    let currentFile = editor.document.fileName;
    let fileNameWithoutExtension = getFileNameWithoutExtension(currentFile);

    if (fileIsTs(currentFile) || fileIsStyle(currentFile) || fileIsTemplate(currentFile)) {        
        openCorrespondingFile(fileNameWithoutExtension, ...specFormats);        
    }
    else if (fileIsSpec(currentFile)) {
        if (previous && previous !== currentFile) {
            if (previous.startsWith(fileNameWithoutExtension)) {
                openFile(previous);
            } else {
                openCorrespondingFile(fileNameWithoutExtension, ".ts");
            }
        } else {
            openCorrespondingFile(fileNameWithoutExtension, ".ts");
        }
    }
}

async function openFile(fileName: string): Promise<boolean> {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return false;
    }

    try {
        let doc = await vscode.workspace.openTextDocument(fileName);
        if (doc) {
            await vscode.window.showTextDocument(doc, openSideBySide ? vscode.ViewColumn.Two : editor.viewColumn);
        }
        previous = editor.document.fileName;
        return true;
    } catch (error) {
        return false;
    }
}

async function openCorrespondingFile(fileNameWithoutExtension: string, ...formats: string[]) {
    var editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    for (let index = 0; index < formats.length; index++) {
        const fileName = `${fileNameWithoutExtension}${formats[index]}`;
        const textEditor = vscode.window.visibleTextEditors.find(textDocument => textDocument.document.fileName === fileName);
        if(reuseView && !!textEditor) {
          await vscode.window.showTextDocument(textEditor.document, textEditor.viewColumn);
          break;
        }
        var succ = await openFile(fileName);
        if (succ) {
            break;
        }
    }
}

function fileIsTemplate(path: string) {
    return fileIs(path, ...templateFormats);
}

function fileIsStyle(path: string) {
    return fileIs(path, ...styleFormats);
}

function fileIsTs(path: string) {
    if (fileIsSpec(path)) {
        return false;
    }
    return fileIs(path, ".ts");
}

function fileIsSpec(path: string) {
    return fileIs(path, ...specFormats);
}