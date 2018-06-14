'use strict'
const fs = require('fs')
const _ = require('lodash')

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

const hasCommand = (command, commands) => {
  return commands.data.returnArrayChunks.some(argumentArray => argumentArray[0] === command)
}

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

  const {callback} = require('../../lib/unlimited-curry/index')

  return function (argumentsFrom) {
    return callback((e,data)=>{
      const commands = data.getFrom(1)
      const origArguments = data.data.returnArrayChunks[0]
      const logEntry = module.createLogEntry(createBody, argumentsFrom, stackTrace.stackTraceString, stack, origArguments)
      logEntry.hashes = logEntry.hashes || []
      let result = messageCreator(module.calculatedParameters, logEntry, true, true)
      console.log(result.toString())
      logEntry.logBody = createBody(false, argumentsFrom, origArguments, module.calculatedParameters, module.loggerPrintHelpers)
      let consoleMessage = '\n' + messageCreator(module.calculatedParameters, logEntry, false, false) +
      dictionary.delimiterInFiles

      if(hasCommand('last', commands)){
        module.runtimeVariables.lastLogs =  []
        module.runtimeVariables.lastLogs.push(logEntry)
        // ll(module.runtimeVariables.lastLogs,"VVVVVVVVVVVV")
      }
      if(hasCommand('lasts', commands)){
        module.runtimeVariables.lastLogs = module.runtimeVariables.lastLogs || []
        module.runtimeVariables.lastLogs = module.runtimeVariables.lastLogs.concat([logEntry])
      }

      fs.appendFileSync(module.runtimeVariables.sessionLogFile, consoleMessage)
      module.runtimeVariables.collectedLogs.push(messageCreator(module.calculatedParameters, logEntry, false, false))

      if(hasCommand('return', commands)){
        // ll(origArguments.pop())
        return origArguments.pop()
      }

      if(hasCommand('die', commands)){
        ll("FFFFfffFFffFFfFFff")
        process.exit()
      }
    })
  }
  // return mainFunction
}