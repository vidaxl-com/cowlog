'use strict'
const fs = require('fs')

module.exports = exports = function (container) {
  let messageCreator = container['message-creator']
  module.logFileCreator = container['log-file-creator']
  module.runtimeVariables = container['runtime-variables']
  module.loggerPrintHelpers = container['logger-print-helpers']
  module.calculatedParameters = container['calculated-parameters']
  const createBody = container['logger-body-factory']
  const dictionary = module.dictionary = container.dictionary
  return function (argumentsFrom) {
    module.argumentsFrom = argumentsFrom
    return function () {
      let loggerStackTraceFactory = container['logger-stack-trace-factory']
      let stackTrace = loggerStackTraceFactory()
      module.stackTraceString = stackTrace.stackTraceString
      module.stack = stackTrace.stack
      module.origArguments = arguments
      let logEntry = module.createLogEntry(createBody)
      let returnLevel = 0
      let returnFunction = function (command) {
        returnLevel++
        let returnValue = returnFunction
        logEntry.hashes = logEntry.hashes || []
        let returnValue_ = module.evaluateReturnFunctionOptions(command, logEntry)
        // console.log(returnValue_)
        if (returnValue_) {
          returnValue = returnValue_
        }
        if (returnLevel === 1) {
          let result = messageCreator(module.calculatedParameters, logEntry, true, true)
          console.log(result.toString())
          logEntry.logBody = createBody(false, argumentsFrom, module.origArguments, module.calculatedParameters, module.loggerPrintHelpers)
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
}

module.createLogEntry = function (bodyFactory) {
  return {
    stackTraceFile: module.logFileCreator(module.stackTraceString, 'stack-trace.log'),
    sessionLog: module.runtimeVariables.sessionLogFile,
    calledFrom: module.stack[0],
    stack: module.stack,
    logBody: bodyFactory(true, module.argumentsFrom, module.origArguments, module.calculatedParameters, module.loggerPrintHelpers),
    dateTime: new Date().toISOString()
  }
}

module.evaluateReturnFunctionOptions = function (command, logEntry) {
  let returnValue = false
  if (command) {
    module.die(command)
    module.lasts(command, logEntry)
    module.last(command, logEntry)
    if (command === module.dictionary.return) {
      returnValue = (module.origArguments[module.origArguments.length - 1])
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
