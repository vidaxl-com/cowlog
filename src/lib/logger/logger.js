'use strict'

const stackTrace = require('stacktrace-js')
const fs = require('fs')
const path = require('path')
const removeNumberOfEntitiesSelfReferncesFromStacktrace = 2
const delimiterInFiles = '\n\n--------------------------------------------------\n--------------------------------------------------\n'

const createBody = require('./body-factory')

module.exports = function (messageCreator, hashCreator, logfileCreator, runtimeVariables, loggerPrintHelpers, calculatedParameters) {
  return function (argumentsFrom) {
    return function () {
      let stack = stackTrace.getSync()
      let origArguments = arguments

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
