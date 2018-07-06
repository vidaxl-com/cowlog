'use strict'

const stackTrace = require('stacktrace-js')
const removeNumberOfEntitiesSelfReferncesFromStacktrace = 7
const fs = require('fs')
const path = require('path')

module.exports = exports = function (container) {
  const logfileCreator = container['log-file-creator']
  const hashCreator = container['hash-creator']
  const loggerPrintHelpers = container['logger-print-helpers']

  return function () {
    const stack = stackTrace.getSync()
      .slice(removeNumberOfEntitiesSelfReferncesFromStacktrace)
    stack.forEach(function (value) {
      try {
        const fileName = value.fileName
        const fileContent = fs.readFileSync(fileName)
        value.fileLog = logfileCreator(fileContent, 'source.log' + path.extname(fileName))
        value.hash = hashCreator(value.filename + ' ' + value.functionName + ' ' + value.source + ' ' + value.fileLog +
          ' ' + value.columnNumber + ' ' + value.lineNumber
        )
      } catch (e) {
        
      }
    })
    const stackTraceString = loggerPrintHelpers.serialize(stack)

    return {stack, stackTraceString}
  }
}
