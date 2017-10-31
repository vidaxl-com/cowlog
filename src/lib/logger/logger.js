'use strict'

const fs = require('fs')
const path = require('path')
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

      let logEntry = {
        stackTraceFile: logfileCreator(stackTraceString, 'stack-trace.log'),
        sessionLog: runtimeVariables.sessionLogFile,
        calledFrom: stack[0],
        stack: stack,
        logBody: createBody(true, argumentsFrom, origArguments, calculatedParameters, loggerPrintHelpers),
        dateTime: new Date().toISOString()
      }

      let returnLevel = 0
      let returnFunction = function (options) {
        returnLevel++
        let returnValue = returnFunction
        logEntry.hashes = logEntry.hashes || []

        if (options) {
          logEntry.options = options
          if (options === 'die') {
            process.exit()
          }
          if (options === 'last') {
            runtimeVariables.lastLogs = [logEntry]
          }
          if (options === 'lasts') {
            runtimeVariables.lastLogs = runtimeVariables.lastLogs || []
            runtimeVariables.lastLogs.push(logEntry)
          }
          if (options === 'return') {
            returnValue = (origArguments[origArguments.length - 1])
          }
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
