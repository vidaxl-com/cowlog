const linkerFile = require('./linker-file')
const fileProvider = require('./file-provider')
const isArray = require('is-array')

require('../../../index')()

module.exports = exports = function (dir, beginning, closing, newValue = null) {
  let files = fileProvider(dir)
  let returnValue = {}
  if (newValue) {
    files.forEach(function (file) {
      let result = linkerFile (file, beginning, closing, newValue)
      // let {returnData} = result
      let {changed} = result
      if (changed.all) {
        returnValue[file] = true
      }
    })

    return returnValue
  }

  if (!newValue) {
    files.forEach(function (file) {
      let result = linkerFile(file, beginning, closing)
      returnValue = result.returnData
    })

    return returnValue
  }
}
