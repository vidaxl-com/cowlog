
const RETURN_FROM_CALLBACK = 0
require('cowlog')()
const getFrom = require('./get-data-from')
const safetyExecutor = require('./detached-executor')
const getParameterCommands = require('./get-parameter-command')

module.exports = exports = (paramters = false) => function me (callback, registeredCommand = false, state = false, caller = false) {
  const chainCommands = getParameterCommands(paramters, 'chainCommands', 'allEntries')
  const originalArguments = {
    callback, registeredCommand, state, caller
  }
  let timeoutSate = null
  let level = 0
  let returnArray = []
  let returnArrayChunks = []

  if(!state)
  state = require('./state-factory')(timeoutSate, level, returnArray, returnArrayChunks, getFrom)

  let actualCommand = false
  const callerRaw =   function () {
    // parameters
    if (!caller.called) {
      caller.called = true
      return caller
    }
    state.start()
    const callerArguments = Array.from(arguments)
    if (callerArguments.length) {
      state.setCommandArguments(callerArguments)
    }

    let data = caller.data = getFrom(0, {returnArrayChunks: state.returnArrayChunks})

    caller.p = require('./caller-promise-factory-factory')(state, callback)
    /* istanbul ignore else */
    if (!arguments.length && callback && typeof callback === 'function') {
      clearTimeout(state.timeoutSate)
      state.resetMe = true

      return callback(RETURN_FROM_CALLBACK, data)
    }
    /* istanbul ignore else */
    if (!arguments.length && !callback) {
      return data
    }
    /* istanbul ignore else */
    if (arguments.length) {
      /* istanbul ignore else */
      if (state.timeoutSate) {
        clearTimeout(state.timeoutSate)
      }
      state.timeoutSate = safetyExecutor(data, callback)
    }
    state.level++

    return caller
  }

  caller = new Proxy(callerRaw,
    {
      get(obj, prop){
        let newChain = false
        if(prop!='called' && prop!='p'){
          newChain = state.setCommandName(prop)
        }
        if(!newChain){
          return Reflect.get(...arguments);
        }
        if(newChain) {
          return me(callback, prop, state)
        }
      },
      apply(target, thisArg, argumentsList) {
        return target(...argumentsList);
      },
      set(obj, prop, value) {
       return Reflect.set(...arguments);
      }
    })

  // caller = callerRaw

  // l("WAA", !registeredCommand && chainCommands, registeredCommand, chainCommands)
  if (!registeredCommand && chainCommands) {
    chainCommands.forEach((row) => row.forEach((command) => {
      caller[command] = me(callback, command, state)
      actualCommand = command
    }))
  }

  // if (!registeredCommand && chainCommands) {
  //   chainCommands.forEach((row) => row.forEach((command) => {
  //     caller[command] = me
  //     caller[command]["command"] = command
  //     actualCommand = command
  //   }))
  // }

  return caller(state.returnArray)
}
