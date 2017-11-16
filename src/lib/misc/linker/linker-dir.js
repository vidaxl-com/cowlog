const readdir = require('recursive-readdir-sync')
const linkerFile = require('./linker-file')

module.exports = exports = function (dir, beginning, closing, newValue) {
  let files = readdir(dir)
  files = files || []
  let returnValue = {}
  files.forEach(function (file) {

    let result = linkerFile(file, beginning, closing, newValue)
    if(result){
      returnValue[file] = result
    }
  })

  return returnValue
}
