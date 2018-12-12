'use strict'
const fs = require('fs')
const _ = require('lodash')
const functionRegister = {}
const dslFramework = require('dsl-framework')()
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

const beforePrintCommandOrder = ['keys']
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
  let messageCreator = container['message-creator']
  module.logFileCreator = container['log-file-creator']
  module.runtimeVariables = container['runtime-variables']
  module.loggerPrintHelpers = container['logger-print-helpers']
  module.calculatedParameters = container['calculated-parameters']
  const createBody = container['logger-body-factory']
  const dictionary = module.dictionary = container.dictionary
  const loggerStackTraceFactory = container['logger-stack-trace-factory']

  const callback = function () {

    let retv = null
    let printed = false
    let returnFuction = dslFramework((e,data)=>{
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

      // console.log(data, data.command.has('keys'))

      underscoreFunctions.forEach(command=>{
        const printerDelta = module.registerUnderscoreFunction(command, commands, stack, printer, 'print')
        if(printerDelta.toString() !== printer.toString()){
          lodashPrinters.push(printerDelta)
        }
      })

      let lastsed = false
      let muted = false
      let dead = false

      afterPrintCommandOrder.forEach(command=>{

        if(command === 'last' && commands.command.has(command)){
          module.runtimeVariables.lastLogs =  []
          module.runtimeVariables.lastLogs.push(logEntry)
        }

        if(command === 'mute' && commands.command.has(command)){
          muted = true
        }

        // if(command === 'delay' && module.hasCommand(command, commands)){
        //   muted = true
        // }

        if(command === 'lasts' && commands.command.has('lasts')){
          if(!lastsed){
            module.runtimeVariables.lastLogs = module.runtimeVariables.lastLogs || []
            module.runtimeVariables.lastLogs.push(logEntry)
            lastsed = true
          }
        }

        if(command === 'return' && commands.command.has(command)){
          retv = data.data.returnArrayChunks[0][data.data.returnArrayChunks[0].length-1]
        }

        if(command === 'die' && commands.command.has(command)){
          dead = true
        }

      })

      if(!muted){
        if(!printed){
          printed = true
          if(lodashPrinters.length){
            lodashPrinters.forEach(printer=>printer(result))
          }else{
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

      if(dead){
        module.cancelUnderscore(functionRegister)
        process.exit(0)
      }

      if(retv != null){
        return retv
      }
    })

    return returnFuction

  }
  return callback
}
