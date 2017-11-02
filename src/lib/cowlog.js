'use strict'
module.exports = exports = function (container) {

  let logger = container['logger']
  let messageCreator = container['message-creator']
  let runtimeVariables = container['runtime-variables']

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
            console.log(
              '\n----------------------------------------------------------------------------------------------------\n' +
              '----------------------------------------------------------------------------------------------------\n' +
              'The following log entry is shown here because asked for it to show it again before the program exits\n' +
              '----------------------------------------------------------------------------------------------------\n' +
              '----------------------------------------------------------------------------------------------------\n\n'
            )

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
