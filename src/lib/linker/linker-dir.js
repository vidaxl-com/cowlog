const readdir = require('recursive-readdir-sync')
const linkerFile = require('./linker-file')

module.exports = exports = function (dir, beginning, closing, newValue) {
  let files = readdir(dir)
  files = files || []
  let returnValue = {}
  files.forEach(function (file) {
    returnValue[file] = linkerFile(file, beginning, closing, newValue)
  })

  return returnValue
}
