const fs = require('fs')
const linker = require('./linker');

module.exports = exports = function (file, beginning, closing, newValue = null) {
  let string = fs.readFileSync(file, {encoding: 'utf8'})
  let result = linker(string, beginning, closing, newValue)
  let {returnData} = result
  let writeFile = (returnData !== string)

  if (newValue) {
    if (writeFile) {
      fs.writeFileSync(file, returnData)

      return returnData
    }
  }

  if (!newValue && returnData) {

    return returnData
  }

  return ''
}
