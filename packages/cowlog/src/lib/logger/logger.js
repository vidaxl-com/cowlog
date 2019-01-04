'use strict'
const fs = require('fs')
const _ = require('lodash')
const functionRegister = {}
const dslFramework = require('dsl-framework').noPromoises()
const isObject = require('isobject')

module.createLogEntry = function (bodyFactory, stackTraceString, stack, origArguments) {
  return {
    stackTraceFile: module.logFileCreator(stackTraceString, 'stack-trace.log'),
    sessionLog: module.runtimeVariables.sessionLogFile,
    calledFrom: stack[0],
    stack: stack,
    logBody: bodyFactory(true, origArguments, module.calculatedParameters, module.loggerPrintHelpers),
    dateTime: new Date().toISOString()
  }
}

const underscoreFunctions = ['throttle', 'debounce', 'once']
const afterPrintCommandOrder = ['keys','mute','delay','lasts', 'last', 'return', 'die']

const printToConsole = result => console.log(result.toString())
module.createCachedFunctionIndex = (command, stack, codeLocation) => `${codeLocation}_${command}_${stack[0]['hash']}`

module.registerUnderscoreFunction = (command, commands, stack, fn, codeLocation, ...rest) => {
  const functionIndex = module.createCachedFunctionIndex(command, stack, codeLocation)
  if(commands.command.has(command)){
    let wrapped = functionRegister[functionIndex]
    if(!wrapped){
      wrapped = _[command](
        data=>fn(data)
        , commands.command.getArguments(command))
      wrapped.wrapped = true
      functionRegister[functionIndex] = wrapped
    }
    return wrapped
  }
  return fn
}

module.cancelUnderscore = (functionRegister) => {
  Object.keys(functionRegister).forEach(key=>{
    let cancel = functionRegister[key].cancel
    if(cancel) cancel()
  })
}

module.exports = exports = function (container) {
  const messageCreator = container.get('message-creator')
  module.logFileCreator = container.get('log-file-creator')
  module.runtimeVariables = container.get('runtime-variables')
  module.loggerPrintHelpers = container.get('logger-print-helpers')
  module.calculatedParameters = container.get('calculated-parameters')
  const createBody = container.get('logger-body-factory')
  const dictionary = module.dictionary = container.get('dictionary')
  const loggerStackTraceFactory = container.get('logger-stack-trace-factory')

  const callback = ()=>{
    let retv = {}
    let printed = false
    let returnFuction = dslFramework((e, data)=>{
      const commands = data.getFrom(1, data.data.returnArrayChunks)
      const stackTrace = loggerStackTraceFactory()
      const stack = stackTrace.stack
      let origArguments = data.data.returnArrayChunks[0]

      if(data.command.has('keys')){
        origArguments = origArguments.map((argumentField)=>{
          if(isObject(argumentField)){
            return Object.keys(argumentField)
          }
          return argumentField
        })
      }

      const logEntry = module.createLogEntry(createBody, stackTrace.stackTraceString, stack, origArguments)
      logEntry.hashes = logEntry.hashes || []

      let result = messageCreator(module.calculatedParameters, logEntry, true, true);

      let printer = printToConsole
      let lodashPrinters = []

      underscoreFunctions.forEach(command=>{
        const printerDelta = module.registerUnderscoreFunction(command, commands, stack, printer, 'print')
        if(printerDelta.toString() !== printer.toString()){
          lodashPrinters.push(printerDelta)
        }
      })

      let exitState = require('./parser/exit-state')()
      require('./parser/after-print-commands')(commands, afterPrintCommandOrder, module, exitState, retv, data, logEntry)

      if(!exitState.muted){
        if(!printed){
          printed = true
          if(lodashPrinters.length){
            lodashPrinters.forEach(printer=>printer(result))
          }
          if(!lodashPrinters.length){
            printer(result)
          }
        }

        logEntry.logBody = createBody(false, origArguments, module.calculatedParameters, module.loggerPrintHelpers)
        let consoleMessage = '\n' + messageCreator(module.calculatedParameters, logEntry, false, false) +
          dictionary.delimiterInFiles

        // todo: add documentation
        if(commands.command.has('forget')){
          fs.appendFileSync(module.runtimeVariables.sessionLogFile, consoleMessage)
        }
        module.runtimeVariables.collectedLogs.push(messageCreator(module.calculatedParameters, logEntry, false, false))
      }

      if(exitState.dead){
        module.cancelUnderscore(functionRegister)
        process.exit(0)
      }

      if(Object.keys(retv).length !== 0){
        return retv.retv
      }
    })

    return returnFuction
  }
  return callback
}
