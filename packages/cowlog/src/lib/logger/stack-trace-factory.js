'use strict'

const stackTrace = require('stacktrace-js')
const removeNumberOfEntitiesSelfReferncesFromStacktrace = 7
const fs = require('fs')
const path = require('path')

module.exports = exports = function (container) {
  let logfileCreator = container['log-file-creator']
  let hashCreator = container['hash-creator']
  let loggerPrintHelpers = container['logger-print-helpers']

  return function () {
    let stack = stackTrace.getSync().slice(removeNumberOfEntitiesSelfReferncesFromStacktrace)
    stack.forEach(function (value) {
      try {
        let fileName = value.fileName
        let fileContent = fs.readFileSync(fileName)
        value.fileLog = logfileCreator(fileContent, 'source.log' + path.extname(fileName))
        value.hash = hashCreator(value.filename + ' ' + value.functionName + ' ' + value.source + ' ' + value.fileLog +
          ' ' + value.columnNumber + ' ' + value.lineNumber
        )
      } catch (e) {
        
      }
    })

    let stackTraceString = loggerPrintHelpers.serialize(stack)

    console.table(stackTraceString)

    return {stack, stackTraceString}
  }
}
