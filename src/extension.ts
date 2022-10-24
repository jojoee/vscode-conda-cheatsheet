import * as vscode from 'vscode'
import * as path from 'path'
import * as fs from 'fs'

const CONDA_CHEATSHEET_URL: string = 'https://docs.conda.io/projects/conda/en/latest/user-guide/cheatsheet.html'

function getPdfDisposable (
  context: vscode.ExtensionContext,
  fileNames: string[],
  name: string,
  displayName: string
) {
  // set panel
  const assetPath = path.join(context.extensionPath, 'asset')

  const panel = vscode.window.createWebviewPanel(
    name,
    displayName,
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
}

export function activate (context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "conda-cheatsheet" is now active!')

  const pdfDisposable46 = vscode.commands.registerCommand('extension.openPdf46', () => {
    const fileNames = [
      'conda-4.6-1.jpg',
      'conda-4.6-2.jpg'
    ]
    const name = 'condaCheatsheetPdf46'
    const displayName = 'Conda Cheatsheet PDF (4.6)'
    getPdfDisposable(context, fileNames, name, displayName)
  })

  const pdfDisposable412 = vscode.commands.registerCommand('extension.openPdf412', () => {
    const fileNames = [
      'conda-4.12-1.jpg',
      'conda-4.12-2.jpg'
    ]
    const name = 'condaCheatsheetPdf412'
    const displayName = 'Conda Cheatsheet PDF (4.12)'
    getPdfDisposable(context, fileNames, name, displayName)
  })

  const pdfDisposable414 = vscode.commands.registerCommand('extension.openPdf414', () => {
    const fileNames = [
      'conda-4.14-1.jpg',
      'conda-4.14-2.jpg'
    ]
    const name = 'condaCheatsheetPdf414'
    const displayName = 'Conda Cheatsheet PDF (4.14)'
    getPdfDisposable(context, fileNames, name, displayName)
  })

  const pdfDisposable = vscode.commands.registerCommand('extension.openPdf', () => {
    const fileNames = [
      'conda-4.14-1.jpg',
      'conda-4.14-2.jpg'
    ]
    const name = 'condaCheatsheetPdf'
    const displayName = 'Conda Cheatsheet PDF (latest)'
    getPdfDisposable(context, fileNames, name, displayName)
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

  const webviewDisposable = vscode.commands.registerCommand('extension.openWebview', () => {
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
    const htmlFilePath = path.join(assetPath, 'index.html')
    let html = fs.readFileSync(htmlFilePath, 'utf8')
    html = html.replace(/cspSource/g, panel.webview.cspSource.toString())
    html = html.replace('styleFilePath', styleFilePath.toString())
    html = html.replace('scriptFilePath', scriptFilePath.toString())
    panel.webview.html = html

    // listener, copy code
    panel.webview.onDidReceiveMessage(
      (code: string) => {
        vscode.env.clipboard.writeText(code)
          .then(() => {
            const message = `Copied: ${code}`
            vscode.window.setStatusBarMessage(message)
          }, () => {
            vscode.window.showErrorMessage('Copy to clipboard failed')
          })
      },
      undefined,
      context.subscriptions
    )
  })

  context.subscriptions.push(pdfDisposable46)
  context.subscriptions.push(pdfDisposable412)
  context.subscriptions.push(pdfDisposable414)
  context.subscriptions.push(pdfDisposable)
  context.subscriptions.push(websiteDisposable)
  context.subscriptions.push(webviewDisposable)
}

// this method is called when your extension is deactivated
export function deactivate () { }
