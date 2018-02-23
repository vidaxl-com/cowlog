const readdir = require('recursive-readdir-sync')
const linkerFile = require('./linker-file')
const isString = require('is-string')
const empty = require('is-empty');
const cowlog = require('../../../index')();

module.exports = exports = function (dir, beginning, closing, newValue = null) {
  let files = readdir(dir)
  files = files || []
  let returnValue = {}

  if (newValue) {
    files.forEach(function (file) {
      let result = linkerFile(file, beginning, closing, newValue)
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
        // console.log("FFFFFFFFFFffffFFfffFFffFFF", file)

        if (result) {
          // console.log("GGGGGs")
          returnValue = result
          // endEvaluation = true
        }
      }
    })

    return returnValue
  }
}
