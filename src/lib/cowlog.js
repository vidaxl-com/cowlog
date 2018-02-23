'use strict'
module.exports = exports = function (container) {
  let logger = container['logger']
  let messageCreator = container['message-creator']
  let runtimeVariables = container['runtime-variables']
  let dictionary = container.dictionary
  let exitCalled = false

  return function () {
    let cowlog = {
      exit: function () {
        if (runtimeVariables.lastLogs && !exitCalled) {
          console.log(dictionary.dieDelimiter)

          runtimeVariables.lastLogs.forEach(function (log) {
            let result = messageCreator(runtimeVariables.calculatedParameters,
              log, true, true)
            console.log(result)
          })
        }
        exitCalled = true
      },

      log: function () {
        let returnValue = logger(0).apply(this, arguments)
        return returnValue
      },

      logf: function () {
        let returnValue = logger(1).apply(this, arguments)
        return returnValue
      },

      init: function () {
        process.on('exit', cowlog.exit)

        if (runtimeVariables.calculatedParameters.registerGlobal) {
          global.cowlog = cowlog
        }
        if (runtimeVariables.calculatedParameters.registerglobalLogger) {
          if (!global.l) {
            global.l = cowlog.log
          }
        }
        if (runtimeVariables.calculatedParameters.registerglobalLoggerFunction) {
          if (!global.lf) {
            global.lf = cowlog.logf
          }
        }

        return cowlog
      }
    }

    return cowlog.init()
  }
}
