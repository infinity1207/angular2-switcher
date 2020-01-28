import * as vscode from 'vscode';
import { getFileNameWithoutExtension } from "./common";

const HTML_TAGS: string[] = [
    "html",
    "head",
    "body",
    "script",
    "style",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "div",
    "p",
    "a",
    "img",
    "span",
    "strong",
    "em",
    "table",
    "thead",
    "tbody",
    "th",
    "tr",
    "td",
    "ul",
    "li",
    "ol",
    "dl",
    "dt",
    "dd",
    "form",
    "input",
    "label",
    "button",
    "class",
    "id",
    "src",
    "href",
    "click",
    "mousemove"
];

export class TemplateDefinitionProvider implements vscode.DefinitionProvider {
    public provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Location> {
        return new Promise((resolve, reject) => {
            let range = document.getWordRangeAtPosition(position);
            if (!range) {
                resolve();
            }

            let word = document.getText(range);
            if (word.endsWith('?')) {
                word = word.slice(0, word.length - 1);
            }
            // check word as function or property.
            if (HTML_TAGS.findIndex(tag => tag === word.toLowerCase()) >= 0) {
                // console.log(`${word} is html tag.`);
                resolve();
            }

            let wordType = 0;       // 0: property, 1: function
            // if next character is '(', so word is function
            if (document.getText(new vscode.Range(range!.end, range!.end.translate(0, 1))) === '(') {
                wordType = 1;
            }
            // console.log(`wordType: ${wordType}`);

            let pattern: string;
            if (wordType === 0) {               // property
                pattern = `^\\s*(private\\s+)?(${word})|^\\s*(public\\s+)?(${word})|^\\s*(protected\\s+)?(${word})`;
            }
            else {                              // function
                pattern = `^\\s*(private\\s+)?(${word})\\(.*\\)|^\\s*(public\\s+)?(${word})\\(.*\\)|^\\s*(protected\\s+)?(${word})\\(.*\\)`;
            }
            let rgx = new RegExp(pattern);

            // find function|property in ts
            let htmlFile = document.fileName;
            let fileNameWithoutExtension = getFileNameWithoutExtension(htmlFile);
            let tsFile = fileNameWithoutExtension + '.ts';
            let tsUri = vscode.Uri.file(tsFile);
            let enterClass = false;

            vscode.workspace.openTextDocument(tsFile).then((tsDoc) => {
                for (var li = 0; li < tsDoc.lineCount; li++) {
                    let line = tsDoc.lineAt(li);
                    if (line.isEmptyOrWhitespace) {
                        continue;
                    }
                    if (!enterClass) {
                        if (line.text.match(/\s+class\s+/)) {
                            enterClass = true;
                        }
                        continue;
                    }

                    let m = line.text.match(rgx);
                    if (m && m.length > 0) {
                        let pos = line.text.indexOf(word);
                        resolve(new vscode.Location(tsUri, new vscode.Position(li, pos)));
                    }
                }
                resolve();
            });
        });
    }
}