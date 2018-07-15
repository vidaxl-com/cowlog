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
        // if(environmentDependent.isNode) {
          let returnValue = logger(0)(...arguments)
          return returnValue
        // }
        // else{
        //   return console.log(...arguments)
        // }
      },

      logf: function () {
        // if(environmentDependent.isNode) {
          let returnValue = logger(1)(...arguments)
          return returnValue
        // }
        // else{
        //   return console.log(...arguments)
        // }
      },

      init: function () {
        /* istanbul ignore else */
        if(environmentDependent.isNode) {
          process.on('exit', cowlog.exit)
        }

        /* istanbul ignore else */
        if (runtimeVariables.calculatedParameters.registerGlobal) {
          global.cowlog = cowlog
        }
        /* istanbul ignore else */
        if (runtimeVariables.calculatedParameters.registerglobalLogger) {
          /* istanbul ignore else */
          if (!global.l) {
            global.l = cowlog.log
          }
        }
        /* istanbul ignore else */
        if (runtimeVariables.calculatedParameters.registerglobalLoggerFunction) {
          /* istanbul ignore else */
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
