const RETURN_FROM_CALLBACK = 0
const safetyExecutor = require('./detached-executor')

const coreFactory = () => {
  let core = function me (callback, state = false) {
    if (!state) {
      state = require('./state-factory')()
      core.coreData = core.coreData ? core.coreData : state.getFrom(0)
      state.setCoreData(core.coreData)
    }
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
      let coreData = state.getCoreData()
      if (!coreData.command.has('noPromoises')) {
        callerRaw.p = require('./caller-promise-factory-factory')(state, callback)
      }
      // l(coreData, coreData.command)()
      const noTriggerEndOfExecution = coreData.command.has('noTriggerEndOfExecution')
      /* istanbul ignore else */
      if (!arguments.length && callback && typeof callback === 'function') {
        if (!noTriggerEndOfExecution) {
          clearTimeout(state.timeoutSate)
        }
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
      if (arguments.length && !noTriggerEndOfExecution) {
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

    return caller(state.returnArray)
  }

  core.setCoreData = function (data) {
    core.coreData = data
  }

  return core
}

module.exports = coreFactory()
