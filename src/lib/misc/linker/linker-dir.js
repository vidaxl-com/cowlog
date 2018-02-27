const linkerFile = require('./linker-file')
const fileProvider = require('./file-provider')

module.exports = exports = function (dir, beginning, closing, newValue = null) {
  let files = fileProvider(dir)
  let returnValue = {}

  if (newValue) {
    files.forEach(function (file) {
      let result = linkerFile (file, beginning, closing, newValue)
      if (result.changed) {
        returnValue[file] = result
      }
    })

    return returnValue
  }
}
