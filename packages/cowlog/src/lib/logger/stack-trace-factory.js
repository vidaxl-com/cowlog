'use strict'

const stackTrace = require('stacktrace-js')
const removeNumberOfEntitiesSelfReferencesFromStackTrace = 4
const fs = require('fs')
const path = require('path')

module.exports = exports = function (container) {
  const logfileCreator = container.get('log-file-creator')
  const hashCreator = container.get('hash-creator')
  const loggerPrintHelpers = container.get('logger-print-helpers')

  return function () {
    const stack = stackTrace.getSync().slice(removeNumberOfEntitiesSelfReferencesFromStackTrace)
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
