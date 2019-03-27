'use strict'
const fs = require('fs')
const _ = require('lodash')
const functionRegister = {}
const dslFramework = require('dsl-framework').noPromoises()
const lolcatJs = require('lolcatjs')
// console.log(lolcatJs.options)
const stripAnsi =require('strip-ansi')

module.createLogEntry =  (bodyFactory, stackTraceString, stack, origArguments) => ({
    stackTraceFile: module.logFileCreator(stackTraceString, 'stack-trace.log'),
    sessionLog: module.runtimeVariables.sessionLogFile,
    calledFrom: stack[0],
    stack: stack,
    logBody: bodyFactory(true, origArguments, module.calculatedParameters, module.loggerPrintHelpers),
    dateTime: new Date().toISOString()
  })

const underscoreFunctions = ['throttle', 'debounce', 'once']
const afterPrintCommandOrder = ['keys','mute','delay','lasts', 'last', 'return', 'die']

// const resultingOutput = result.toString()
const printToConsole = (lol, lolFreq) => (result) => {
  if(lol){
    lolcatJs.options.seed = Math.round(Math.random() * 1000)
    lolcatJs.options.freq = lolFreq
    result = lolcatJs.fromString(stripAnsi(result))
  }
  console.log(result)
}
module.createCachedFunctionIndex = (command, stack, codeLocation) => `${codeLocation}_${command}`

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
  module.logFileCreator = container.get('log-file-creator')
  module.runtimeVariables = container.get('runtime-variables')
  module.loggerPrintHelpers = container.get('logger-print-helpers')
  module.calculatedParameters = container.get('calculated-parameters')
  const messageCreator = container.get('message-creator')
  const createBody = container.get('logger-body-factory')
  const dictionary = module.dictionary = container.get('dictionary')
  const loggerStackTraceFactory = container.get('logger-stack-trace-factory')

  const callback =()=>{
    let returnValueObject = {}

    let returnFuction = dslFramework((e, data)=>{
      const lol = data.command.has('lol')
      // const lolFreq = data.arguments('lol', 'lastArgument', 0.3)
      let printer = printToConsole(lol, 0.3)
      const commands = data.getFrom(1, data.data.returnArrayChunks)
      const stackTrace = loggerStackTraceFactory()
      const stack = stackTrace.stack
      let origArguments = data.data.returnArrayChunks[0]
      origArguments = require('./parser/keys-command')(data, origArguments)
      let lodashPrinters = []
      require('./parser/underscore-commands-preparations')(module, underscoreFunctions, printer, lodashPrinters, commands, stack)
      let exitState = require('./parser/exit-state')()
      if(commands.command.has('mute')){
        exitState.muted = true
      }
      if(!exitState.muted && !exitState.printed){
        exitState.printed = true

        if(!commands.command.has('forget')) {
          let sessionLogFile = container.get('log-file-creator')('', 'session.log')
          module.runtimeVariables.sessionLogFile = sessionLogFile
        }
          const logEntry = module.createLogEntry(createBody, stackTrace.stackTraceString, stack, origArguments)

        // todo: add documentation, also implement correctly
        if(!commands.command.has('forget')){
          let consoleMessage = '\n' + messageCreator(module.calculatedParameters, logEntry, false, false) +
            dictionary.delimiterInFiles
            fs.appendFileSync(module.runtimeVariables.sessionLogFile , consoleMessage)
        }
        let result = messageCreator(module.calculatedParameters, logEntry, true, true)
        require('./parser/after-print-commands')(commands, afterPrintCommandOrder, module, exitState, returnValueObject, data, logEntry)

        if(lodashPrinters.length){
          lodashPrinters.forEach(printer=>printer(result))
        }
        if(!lodashPrinters.length){
          printer(result)
        }
        logEntry.logBody = createBody(false, origArguments, module.calculatedParameters, module.loggerPrintHelpers)
        module.runtimeVariables.collectedLogs.push(messageCreator(module.calculatedParameters, logEntry, false, false))
      }

      if(exitState.dead){
        module.cancelUnderscore(functionRegister)
        process.exit(0)
      }

      if(Object.keys(returnValueObject).length !== 0){
        return returnValueObject.retv
      }
    })

    return returnFuction
  }
  return callback
}
