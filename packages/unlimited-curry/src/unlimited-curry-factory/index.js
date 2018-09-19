const RETURN_FROM_PROMISE = 1
const RETURN_FROM_CALLBACK = 0
// require('cowlog')()
const getFrom = require('./get-data-from')
const safetyExecutor = require('./detached-executor')

module.exports = exports = (paramters = false) => function (callback) {
  // l(paramters)()
  let timeoutSate = null
  let level = 0
  let returnArray = []
  let returnArrayChunks = []

  const state = require('./state-factory')(timeoutSate, level, returnArray, returnArrayChunks, getFrom)

  let caller = function () {
    // parameters
    if (!caller.called) {
      caller.called = true
      return caller
    }
    state.reset()
    state.level++
    const callerArguments = Array.from(arguments)
    if (callerArguments.length) {
      state.returnArrayChunks.push(callerArguments)
    }

    let data = caller.data = getFrom(0, { returnArrayChunks: state.returnArrayChunks })

    caller.p = () => new Promise((resolve, reject) => {
      clearTimeout(state.timeoutSate)
      const conedState = state.clone()
      let ret = false
      const data = conedState.getData()
      if (typeof callback === 'function') {
        ret = callback(RETURN_FROM_PROMISE, data)
      } else {
        ret = data
      }
      state.resetMe = true

      return resolve(ret)
    })
    /* istanbul ignore else */
    if (!arguments.length) {
      /* istanbul ignore else */
      if (callback) {
        /* istanbul ignore else */
        if (typeof callback === 'function') {
          clearTimeout(state.timeoutSate)
          state.resetMe = true

          return callback(RETURN_FROM_CALLBACK, data)
        }
      }
      /* istanbul ignore else */
      if (!callback) {
        return data
      }
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

  return caller(state.returnArray)
}

// exports.unlimitedCurryFactoryGetter = (paramters = false) => exports
