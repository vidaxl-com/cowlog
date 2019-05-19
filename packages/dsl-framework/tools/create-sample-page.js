// require('cowlog')()
const fs = require('fs')
const path = require('path')
const jsFile = fs.readFileSync(path.join(__dirname, '../dist/web/dsl-framework.min.js'))
const { linkerFile } = require('generic-text-linker')
linkerFile(path.join(__dirname, 'index.tpl.html'), '<script> <!-- 0 -->', '</script> <!-- 0 -->', jsFile.toString())
fs.writeFileSync(path.join(__dirname, '../dist/web/index.html'), fs.readFileSync(path.join(__dirname, 'index.tpl.html')))

// l(jsFile.toString(), linkerFile)()
