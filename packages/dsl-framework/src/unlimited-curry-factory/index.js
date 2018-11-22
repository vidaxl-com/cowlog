const RETURN_FROM_CALLBACK = 0
const safetyExecutor = require('./detached-executor')
const getParameterCommands = require('./get-parameter-command')

module.exports = exports =
  (paramters = false, preRegisterChainCommands = false) => function me (callback, state = false) {
    const chainCommands = getParameterCommands(paramters)('chainCommands', getParameterCommands.GET_ALL_ENTRIES) || []
    if (preRegisterChainCommands) {
      chainCommands.push(['chainCommands'])
    }
    const originalArguments = { callback, state }
    if (!state) { state = require('./state-factory')() }
    const callerRaw = function () {
    // parameters
      if (!callerRaw.called) {
        callerRaw.called = true
        return caller
      }
      // state.start()
      const callerArguments = Array.from(arguments)
      if (callerArguments.length) {
        state.setCommandArguments(callerArguments)
      }

      let data = callerRaw.data = state.getFrom(0)

      callerRaw.p = require('./caller-promise-factory-factory')(state, callback)
      /* istanbul ignore else */
      if (!arguments.length && callback && typeof callback === 'function') {
        clearTimeout(state.timeoutSate)
        state.resetMe = true
        state.start()
        return callback(RETURN_FROM_CALLBACK, data)
      }
      /* istanbul ignore else */
      if (!arguments.length && !callback) {
        state.start()
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

    const caller = new Proxy(callerRaw,
      {
        get (obj, prop) {
          if (prop === 'p' || prop === 'data' || prop === 'apply') {
            return obj[prop]
          }
          state.setCommandName(prop)
          return caller
        },
        apply (target, thisArg, argumentsList) {
          return target(...argumentsList)
        },
        set (obj, prop, value) {
          return Reflect.set(...arguments)
        }
      })

    if (!originalArguments.state && chainCommands) {
      chainCommands.forEach((row) => row.forEach((command) => {
        caller[command] = me(callback, state)
      }))
    }

    return caller(state.returnArray)
  }
