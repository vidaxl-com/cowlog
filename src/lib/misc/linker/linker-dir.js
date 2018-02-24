const linkerFile = require('./linker-file')
const fileProvider = require('./file-provider')

module.exports = exports = function (dir, beginning, closing, newValue = null) {
  let files = fileProvider(dir)
  let returnValue = {}

  if (newValue) {
    files.forEach(function (file) {
      let result = linkerFile (file, beginning, closing, newValue)
      if (result) {
        returnValue[file] = result
      }
    })

    return returnValue
  }

  if (!newValue) {
    let endEvaluation = false
    files.forEach(function (file) {
      if (!endEvaluation){
        let result = linkerFile(file, beginning, closing)

        if (result) {
          returnValue = result
        }
      }
    })

    return returnValue
  }
}
