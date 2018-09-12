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
    /* istanbul ignore else */
    if (newValue) {
      files.forEach(function (file) {
        let result = linkerFile(file, beginning, closing, newValue)
        // let {returnData} = result
        let { changed } = result.meta
        /* istanbul ignore else */
        if (changed.all) {
          returnValue[file] = changed
        }
      })

      return returnValue
    }

    /* istanbul ignore else */
    if (!newValue) {
      let firstFound = false
      returnValue = ''
      files.forEach(function (file) {
        /* istanbul ignore else */
        if (!firstFound) {
          let result = linkerFile(file, beginning, closing)
          /* istanbul ignore else */
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
