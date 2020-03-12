import * as vscode from 'vscode'
import * as path from 'path'

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

  context.subscriptions.push(pdfDisposable)
}

// this method is called when your extension is deactivated
export function deactivate () {}
