(function() {
  const vscode = acquireVsCodeApi()
  const body = document.querySelector('body')

  body.addEventListener('click', event => {
    if (event.target.nodeName === 'PRE') {
      vscode.postMessage(event.target.textContent)
    }
  })
}())
