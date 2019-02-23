'use strict'

const stackTrace = require('stacktrace-js')
const removeNumberOfEntitiesSelfReferencesFromStackTrace = 4
module.exports = exports = function (container) {
  const loggerPrintHelpers = container.get('logger-print-helpers')

  return function () {
    const stack = stackTrace.getSync().slice(removeNumberOfEntitiesSelfReferencesFromStackTrace)
    const stackTraceString = loggerPrintHelpers.serialize(stack)

    return {stack, stackTraceString}
  }
}
