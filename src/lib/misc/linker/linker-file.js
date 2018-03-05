const fs = require('fs')
const linker = require('./linker');

module.exports = exports = function (file, beginning, closing, newValue = null) {
  let string = fs.readFileSync(file, {encoding: 'utf8'})
  let linkerResult = linker(string, beginning, closing, newValue)
  return linkerResult
}
