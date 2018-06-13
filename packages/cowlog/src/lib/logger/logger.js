'use strict'
const fs = require('fs')
const _ = require('lodash')

module.exports = exports = function (container) {
  let messageCreator = container['message-creator']
  module.logFileCreator = container['log-file-creator']
  module.runtimeVariables = container['runtime-variables']
  module.loggerPrintHelpers = container['logger-print-helpers']
  module.calculatedParameters = container['calculated-parameters']
  const createBody = container['logger-body-factory']
  const dictionary = module.dictionary = container.dictionary
  const loggerStackTraceFactory = container['logger-stack-trace-factory']
  const stackTrace = loggerStackTraceFactory()
  const stack = stackTrace.stack

  let mainFunction = function (argumentsFrom) {
    return function () {
      const origArguments = arguments
      const logEntry = module.createLogEntry(createBody, argumentsFrom, stackTrace.stackTraceString, stack, origArguments)
      let returnLevel = 0
      const returnFunction = function (command) {
        returnLevel++
        let returnValue = returnFunction
        logEntry.hashes = logEntry.hashes || []
        let returnValue_ = module.evaluateReturnFunctionOptions(command, logEntry, origArguments)
        // console.log(returnValue_)
        if (returnValue_) {
          returnValue = returnValue_
        }
        if (returnLevel === 1) {
          let result = messageCreator(module.calculatedParameters, logEntry, true, true)
          console.log(result.toString())
          logEntry.logBody = createBody(false, argumentsFrom, origArguments, module.calculatedParameters, module.loggerPrintHelpers)
          let consoleMessage = '\n' + messageCreator(module.calculatedParameters, logEntry, false, false) +
            dictionary.delimiterInFiles
          fs.appendFileSync(module.runtimeVariables.sessionLogFile, consoleMessage)
          module.runtimeVariables.collectedLogs.push(messageCreator(module.calculatedParameters, logEntry, false, false))
        }

        return returnValue
      }

      return returnFunction()
    }
  }
  _.throttle(mainFunction)
  return mainFunction
}

module.createLogEntry = function (bodyFactory, argumentsFrom, stackTraceString, stack, origArguments) {
  return {
    stackTraceFile: module.logFileCreator(stackTraceString, 'stack-trace.log'),
    sessionLog: module.runtimeVariables.sessionLogFile,
    calledFrom: stack[0],
    stack: stack,
    logBody: bodyFactory(true, argumentsFrom, origArguments, module.calculatedParameters, module.loggerPrintHelpers),
    dateTime: new Date().toISOString()
  }
}

module.evaluateReturnFunctionOptions = function (command, logEntry, origArguments) {
  let returnValue = false
  if (command) {
    module.die(command)
    module.lasts(command, logEntry)
    module.last(command, logEntry)
    if (command === module.dictionary.return) {
      returnValue = (origArguments[origArguments.length - 1])
    }
  }
  return returnValue
}

module.lasts = function (command, logEntry) {
  if (command === module.dictionary.lasts) {
    module.runtimeVariables.lastLogs = module.runtimeVariables.lastLogs || []
    module.runtimeVariables.lastLogs.push(logEntry)
  }
}

module.last = function (command, logEntry) {
  if (command === module.dictionary.last) {
    module.runtimeVariables.lastLogs = [logEntry]
  }
}

module.die = function (command) {
  if (command === module.dictionary.die) {
    process.exit()
  }
}
