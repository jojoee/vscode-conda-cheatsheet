import * as vscode from 'vscode'
import * as path from 'path'
import * as fs from 'fs'
import * as pug from 'pug'
import { SECTIONS } from './content';
const CONDA_CHEATSHEET_URL: string = 'https://docs.conda.io/projects/conda/en/latest/user-guide/cheatsheet.html'

export function activate (context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "conda-cheatsheet" is now active!')

  const pdfDisposable = vscode.commands.registerCommand('extension.openPdf', () => {
    // set panel
    const assetPath = path.join(context.extensionPath, 'asset')
    const fileNames = [
      'conda-cheatsheet-4.6-1.jpg',
      'conda-cheatsheet-4.6-2.jpg'
    ]
    const panel = vscode.window.createWebviewPanel(
      'condaCheatsheetPdf',
      'Conda Cheatsheet PDF',
      vscode.ViewColumn.Beside, {
        localResourceRoots: [vscode.Uri.file(assetPath)],
        enableScripts: false
      }
    )

    // set content
    let html: string = ''
    for (const fileName of fileNames) {
      const filePath = vscode.Uri.file(path.join(assetPath, fileName)).with({ scheme: 'vscode-resource' })
      html += `<img src="${filePath}" />`
    }
    panel.webview.html = html
  })

  const websiteDisposable = vscode.commands.registerCommand('extension.openWebsite', () => {
    // set panel
    const panel = vscode.window.createWebviewPanel(
      'condaCheatsheetWebsite',
      'Conda Cheatsheet Website',
      vscode.ViewColumn.Beside, {
        enableScripts: false
      }
    )

    // set content
    const html: string = `
      <style>html, body { height: 100%; !important }</style>
      <iframe style="position:relative; width: 100%; height: 100%; border: 0" src="${CONDA_CHEATSHEET_URL} "></iframe>
    `
    panel.webview.html = html
  })

  const webviewDisposable = vscode.commands.registerCommand('extension.openWebview', async () => {
    // set panel
    const assetPath = path.join(context.extensionPath, 'asset')
    const panel = vscode.window.createWebviewPanel(
      'condaCheatsheetWebview',
      'Conda Cheatsheet Webview',
      vscode.ViewColumn.Beside, {
        localResourceRoots: [vscode.Uri.file(assetPath)],
        enableScripts: true
      }
    )

    // set content
    const styleFilePath = vscode.Uri.file(path.join(assetPath, 'custom.css')).with({ scheme: 'vscode-resource' })
    const scriptFilePath = vscode.Uri.file(path.join(assetPath, 'main.js')).with({ scheme: 'vscode-resource' })
    const templateFilePath = path.join(assetPath, 'template.pug')
    const templateString = await fs.readFileSync(templateFilePath, 'utf8')
    const html = pug.compile(templateString)({
      title: 'Conda Cheatsheet',
      cspSource: panel.webview.cspSource.toString(),
      styleFilePath: styleFilePath.toString(),
      scriptFilePath: scriptFilePath.toString(),
      sections: SECTIONS
    })
    panel.webview.html = html

    // listener, copy code
    panel.webview.onDidReceiveMessage(
      (code: string) => {
        vscode.env.clipboard.writeText(code)
          .then(() => {
            const message = `Copied: ${code}`
            vscode.window.setStatusBarMessage(message)
          }, () => {
            vscode.window.showErrorMessage('Copy to clipboard failed');
          });
      },
      undefined,
      context.subscriptions
    )
  })

  context.subscriptions.push(pdfDisposable)
  context.subscriptions.push(websiteDisposable)
  context.subscriptions.push(webviewDisposable)
}

// this method is called when your extension is deactivated
export function deactivate () {}
