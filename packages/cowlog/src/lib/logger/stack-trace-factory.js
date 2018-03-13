'use strict'

const stackTrace = require('stacktrace-js')
const removeNumberOfEntitiesSelfReferncesFromStacktrace = 3
const fs = require('fs')
const path = require('path')

module.exports = exports = function (container) {
  let logfileCreator = container['log-file-creator']
  let hashCreator = container['hash-creator']
  let loggerPrintHelpers = container['logger-print-helpers']

  return function () {
    let stack = stackTrace.getSync()

    // removing those pieces of the stack trace that belongs to the library
    for (let i = 0; i < removeNumberOfEntitiesSelfReferncesFromStacktrace; i++) {
      stack.shift()
    }

    stack.forEach(function (value) {
      let fileName = value.fileName
      try {
        let fileContent = fs.readFileSync(fileName)
        value.fileLog = logfileCreator(fileContent, 'source.log' + path.extname(fileName))
        value.hash = hashCreator(value.filename + ' ' + value.functionName + ' ' + value.source + ' ' + value.fileLog +
          ' ' + value.columnNumber + ' ' + value.lineNumber
        )
      } catch (err) {

      }
    })

    let stackTraceString = loggerPrintHelpers.serialize(stack)

    return {stack, stackTraceString}
  }
}
