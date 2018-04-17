const linkerFile = require('./linker-file')
const fileProvider = require('./file-provider')
const isString = require('is-string')

module.exports = exports = function (dir, beginning, closing, newValue = null) {
  let files = null
  if (isString(dir)) {
    files = fileProvider(dir)
  }
  try {
    let returnValue = {}
    if (newValue) {
      files.forEach(function (file) {
        let result = linkerFile(file, beginning, closing, newValue)
        // let {returnData} = result
        let {changed} = result.meta
        if (changed.all) {
          returnValue[file] = changed
        }
      })

      return returnValue
    }

    if (!newValue) {
      let firstFound = false
      returnValue = ''
      files.forEach(function (file) {
        if (!firstFound) {
          let result = linkerFile(file, beginning, closing)
          if (module.clearWhitespace(result.returnData)) {
            returnValue = result.returnData
            firstFound = true
          }
        }
      })

      return returnValue
    }
  } catch (e) {
    return ''
  }
}

module.clearWhitespace = require('./clear-whitespace')
