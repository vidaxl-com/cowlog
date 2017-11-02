'use strict'

const fs = require('fs')
const delimiterInFiles = '\n\n--------------------------------------------------\n--------------------------------------------------\n'

const createBody = require('./body-factory')

module.exports = exports = function (container) {

  let messageCreator = container['message-creator']
  module.logFileCreator = container['log-file-creator']
  module.runtimeVariables = container['runtime-variables']
  module.loggerPrintHelpers = container['logger-print-helpers']
  module.calculatedParameters = container['calculated-parameters']

  return function (argumentsFrom) {
    module.argumentsFrom = argumentsFrom
    return function () {
      let loggerStackTraceFactory = container['logger-stack-trace-factory']
      let stackTrace = loggerStackTraceFactory()
      module.stackTraceString = stackTrace.stackTraceString
      module.stack = stackTrace.stack
      module.origArguments = arguments

      let logEntry = module.createLogEntry()
      let returnLevel = 0
      let returnFunction = function (options) {
        returnLevel++
        let returnValue = returnFunction
        logEntry.hashes = logEntry.hashes || []
        let returnValue_ = module.evaluateReturnFunctionOptions(options, logEntry, module.origArguments)
        if(returnValue_) {
          returnValue = returnValue_
        }
        if (returnLevel === 1) {
          let result = messageCreator(module.calculatedParameters, logEntry, true, true)
          console.log(result.toString())
          logEntry.logBody = createBody(false, null, module.origArguments, module.calculatedParameters, module.loggerPrintHelpers)
          let consoleMessage = '\n' + messageCreator(module.calculatedParameters, logEntry, false, false) + delimiterInFiles
          fs.appendFileSync(module.runtimeVariables.sessionLogFile, consoleMessage)
          module.runtimeVariables.collectedLogs.push(messageCreator(module.calculatedParameters, logEntry, false, false))
        }

        return returnValue
      }

      return returnFunction()
    }
  }
}

module.createLogEntry = function () {
  return {
    stackTraceFile: module.logFileCreator(module.stackTraceString, 'stack-trace.log'),
    sessionLog: module.runtimeVariables.sessionLogFile,
    calledFrom: module.stack[0],
    stack: module.stack,
    logBody: createBody(true, module.argumentsFrom, module.origArguments, module.calculatedParameters, module.loggerPrintHelpers),
    dateTime: new Date().toISOString()
  }
}

module.evaluateReturnFunctionOptions = function (options, logEntry) {
  let returnValue = false;
  if (options) {
    module.die(options)
    module.lasts(options, module.runtimeVariables, logEntry)
    module.last(options, module.runtimeVariables, logEntry)
    if (options === 'return') {
      returnValue = (module.origArguments[module.origArguments.length - 1])
    }
  }
  return returnValue
}

module.lasts = function (options, logEntry) {
  if (options === 'lasts') {
    module.runtimeVariables.lastLogs = module.runtimeVariables.lastLogs || []
    module.runtimeVariables.lastLogs.push(logEntry)
  }
}

module.last = function (options, logEntry) {
  if (options === 'last') {
    module.runtimeVariables.lastLogs = [logEntry]
  }
}

module.die = function (options) {
  if (options === 'die') {
    process.exit()
  }
}
