const fs = require('fs')

module.exports = exports = function (file, beginning, closing, newValue = null) {
  let string = fs.readFileSync(file, {encoding: 'utf8'})
  let result = require('./linker')(string, beginning, closing, newValue)
  let writeFile = result !== string && newValue

  if (writeFile) {
    fs.writeFileSync(file, result)

    return result
  }

  if (!writeFile && newValue) {
    return ''
  }

  if(!newValue){
    return result
  }
}
