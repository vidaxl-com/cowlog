const fs = require('fs')
const linker = require('./linker')
module.exports = exports = function (filePath, beginning, closing, newValue = null) {
  let initialFileContent = fs.readFileSync(filePath, {encoding: 'utf8'})

  let result = linker(initialFileContent, beginning, closing, newValue)
  let changed = result.changed
  if(changed){
    fs.writeFileSync(filePath, result.content)
  }

  return {
    filePath,
    changed
  }

}
