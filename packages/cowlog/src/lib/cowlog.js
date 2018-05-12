'use strict'
module.exports = exports = function (logger, messageCreator, runtimeVariables, dictionary, environmentDependent) {
  return function () {
    let exitCalled = false
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
        if(environmentDependent.isNode) {
          let returnValue = logger(0).apply(this, arguments)
          return returnValue
        }
        else{
          return console.log(...arguments)
        }
      },

      logf: function () {
        if(environmentDependent.isNode) {
          let returnValue = logger(1).apply(this, arguments)
          return returnValue
        }
        else{
          return console.log(...arguments)
        }
      },

      init: function () {
        if(environmentDependent.isNode) {
          process.on('exit', cowlog.exit)
        }

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
