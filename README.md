# [Conda Cheatsheet](https://marketplace.visualstudio.com/items?itemName=jojoee.conda-cheatsheet)
A Visual Studio Code extension that lets you open Conda cheatsheet inside the editor.

[![Version](https://vsmarketplacebadge.apphb.com/version/jojoee.conda-cheatsheet.svg)](https://marketplace.visualstudio.com/items?itemName=jojoee.conda-cheatsheet)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/jojoee.conda-cheatsheet.svg)](https://marketplace.visualstudio.com/items?itemName=jojoee.conda-cheatsheet)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-short/jojoee.conda-cheatsheet.svg)](https://marketplace.visualstudio.com/items?itemName=jojoee.conda-cheatsheet)

![Demo](./asset/screenshot/demo.gif)
![PDF](./asset/screenshot/pdf-768.png)
![Support Dark and Light Theme](./asset/screenshot/support-dark-and-light-theme-1024.png)

## Features
- `Conda Cheatsheet: PDF` to open PDF file inside editor
- `Conda Cheatsheet: Website` to open website inside editor
- `Conda Cheatsheet: Webview` to open website inside editor
  - Support both light and dark theme
  - Click on the content section for jump to selected section immediately
  - Copy and Paste command

## TODO
- [ ] Automated: download pdf => convert to image for `onCommand:extension.openPdf` command
- [ ] Automated: test
- [ ] Automated: watch and run `compileWebview.js` file
- [ ] Refactoring

## Demo
1. Basic usage + feature
- `alt + shift + P` to open available commands
- Select for open "Webview"
- Click to "Sharing Environments" section
- Hover on some command
- Click it for copy the command
- `alt + N` to create new file
- `alt + V` to pate the command
2. Support theme changing
3. Support other view e.g. PDF and website

## Development
```
node tool/compileWebview.js && npm run compile

npm run compile
npm run test
npm run deploy
vsce login jojoee
vsce publish
```

## Reference
- [Conda - Conda documentation](https://docs.conda.io/en/latest/)
