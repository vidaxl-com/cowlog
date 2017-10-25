'use strict'
require('colors')
const stringifyObject = require('stringify-object')
const functionArguments = require('function-arguments')
const stackTrace = require('stacktrace-js')
const fs = require('fs')
const path = require('path')
const removeNumberOfEntitiesSelfReferncesFromStacktrace = 2
const delimiterInFiles = '\n\n--------------------------------------------------\n--------------------------------------------------\n'

module.exports = function (messageCreator, hashCreator, logfileCreator, runtimeVariables) {
  let calculatedParameters = runtimeVariables.calculatedParameters

  let logger = function (argumentsFrom) {
    let me = logger

    logger._getInverseString = function (inverse, string) {
      if (inverse) {
        return string.inverse
      }

      return string
    }

    logger._printMsg = function (iterator, message) {
      let msg = message
      if (calculatedParameters.alternateParameterPrint) {
        let isInverseColor = this._isInversePrint(iterator)
        msg = this._getInverseString(isInverseColor, message)
      }

      return msg
    }

    logger._serialize = function (data) {
      return stringifyObject(data, {
        indent: '  ',
        singleQuotes: false
      })
    }

    return function () {
      let stack = stackTrace.getSync()
      let origArguments = arguments

      const createBody = function (colored) {
        let referenceFunctionArguments = false
        if (argumentsFrom) {
          referenceFunctionArguments = functionArguments(origArguments[0])
        }
        let originalArguments = origArguments

        let logBody = ''
        let parametersLength = originalArguments.length
        for (let i = argumentsFrom; i < parametersLength; i++) {
          let argumentName = i
          if (referenceFunctionArguments) {
            argumentName = referenceFunctionArguments[(i - argumentsFrom)]
          }

          let newMsg = ''
          let value = originalArguments[i]
          let head = argumentName + ' Beginnig ---'
          if (calculatedParameters.alternateParameterHeadPrint) {
            head = me._getInverseString(colored, head)
          }
          head = '\n' + head + '\n'
          newMsg += head
          let stringifyedParameter = stringifyObject(value, {
            indent: '  ',
            singleQuotes: false
          })
          newMsg += me._printMsg(i, stringifyedParameter)
          let foot = argumentName + ' End ---'
          if (calculatedParameters.alternateParameterFootPrint) {
            foot = me._getInverseString(colored, foot)
          }
          foot = '\n' + foot + '\n'
          newMsg += foot
          logBody += newMsg
        };

        return logBody
      }

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

      let stackTraceString = logger._serialize(stack)

      let logEntry = {
        stackTraceFile: logfileCreator(stackTraceString, 'stack-trace.log'),
        sessionLog: runtimeVariables.sessionLogFile,
        calledFrom: stack[0],
        stack: stack,
        logBody: createBody(true),
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
          logEntry.logBody = createBody(false)
          let consoleMessage = '\n' + messageCreator(calculatedParameters, logEntry, false, false) + delimiterInFiles
          fs.appendFileSync(runtimeVariables.sessionLogFile, consoleMessage)
          runtimeVariables.collectedLogs.push(messageCreator(calculatedParameters, logEntry, false, false))
        }

        return returnValue
      }

      return returnFunction()
    }
  }

  return logger
}
