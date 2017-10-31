'use strict'

const fs = require('fs')
const delimiterInFiles = '\n\n--------------------------------------------------\n--------------------------------------------------\n'

const createBody = require('./body-factory')

module.exports = function (messageCreator, hashCreator, logfileCreator, runtimeVariables, loggerPrintHelpers,
                                                                        calculatedParameters, stackTraceFactory) {
  return function (argumentsFrom) {
    return function () {
      let origArguments = arguments
      let stackTrace = stackTraceFactory()
      let stackTraceString = stackTrace.stackTraceString
      let stack = stackTrace.stack
      let logEntry = module.createLogEntry(stackTraceString, stack, argumentsFrom, origArguments, calculatedParameters,
                                                                   loggerPrintHelpers, logfileCreator, runtimeVariables)
      let returnLevel = 0
      let returnFunction = function (options) {
        returnLevel++
        let returnValue = returnFunction
        logEntry.hashes = logEntry.hashes || []
        let returnValue_ = module.evaluateReturnFunctionOptions(options, logEntry, runtimeVariables, origArguments)
        if(returnValue_) {
          returnValue = returnValue_
        }
        if (returnLevel === 1) {
          let result = messageCreator(calculatedParameters, logEntry, true, true)
          console.log(result.toString())
          logEntry.logBody = createBody(false, argumentsFrom, origArguments, calculatedParameters, loggerPrintHelpers)
          let consoleMessage = '\n' + messageCreator(calculatedParameters, logEntry, false, false) + delimiterInFiles
          fs.appendFileSync(runtimeVariables.sessionLogFile, consoleMessage)
          runtimeVariables.collectedLogs.push(messageCreator(calculatedParameters, logEntry, false, false))
        }

        return returnValue
      }

      return returnFunction()
    }
  }
}

module.createLogEntry = function (stackTraceString, stack, argumentsFrom, origArguments, calculatedParameters, loggerPrintHelpers, logfileCreator, runtimeVariables) {
  return {
    stackTraceFile: logfileCreator(stackTraceString, 'stack-trace.log'),
    sessionLog: runtimeVariables.sessionLogFile,
    calledFrom: stack[0],
    stack: stack,
    logBody: createBody(true, argumentsFrom, origArguments, calculatedParameters, loggerPrintHelpers),
    dateTime: new Date().toISOString()
  }
}

module.evaluateReturnFunctionOptions = function (options, logEntry, runtimeVariables, origArguments) {
  let returnValue = false;
  if (options) {
    module.die(options)
    module.lasts(options, runtimeVariables, logEntry)
    module.last(options, runtimeVariables, logEntry)
    if (options === 'return') {
      returnValue = (origArguments[origArguments.length - 1])
    }
  }
  return returnValue
}

module.lasts = function (options, runtimeVariables, logEntry) {
  if (options === 'lasts') {
    runtimeVariables.lastLogs = runtimeVariables.lastLogs || []
    runtimeVariables.lastLogs.push(logEntry)
  }
}

module.last = function (options, runtimeVariables, logEntry) {
  if (options === 'last') {
    runtimeVariables.lastLogs = [logEntry]
  }
}

module.die = function (options) {
  if (options === 'die') {
    process.exit()
  }
}
