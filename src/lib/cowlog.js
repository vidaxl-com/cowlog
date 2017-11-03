'use strict'
module.exports = exports = function (container) {

  let logger = container['logger']
  let messageCreator = container['message-creator']
  let runtimeVariables = container['runtime-variables']
  let dictionary = container.dictionary

  return function () {
    let cowlog = {
      log: function () {
        let returnValue = logger(0).apply(this, arguments)
        return returnValue
      },
      logf: function () {
        let returnValue = logger(1).apply(this, arguments)
        return returnValue
      },
      init: function () {
        process.on('exit', function () {
          if (runtimeVariables.lastLogs) {
            console.log(dictionary.dieDelimiter)

            runtimeVariables.lastLogs.forEach(function (log) {
              let result = messageCreator(runtimeVariables.calculatedParameters, log, true, true)
              console.log(result)
            })
          }
        })
        if (runtimeVariables.calculatedParameters.registerGlobal) {
          global.cowlog = cowlog
        }

        return cowlog
      }
    }

    return cowlog.init()
  }
}
