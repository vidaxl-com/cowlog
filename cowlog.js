'use strict'
module.exports = function (logFileCreator) {
  return function (parameters) {
    const calculatedParamteres = require('./app/configParser')(parameters)
    const randomstring = require('randomstring')
    const hrTime = process.hrtime()

    let cowlog = {
      makeLogFile: logFileCreator,
      _logs: [],
      _fileLogs: {},
      _collectedLogs: [],
      _sessionId: randomstring.generate(),
      log: function () {
        let returnValue = cowlog._makeLogger(0).apply(this, arguments)
        return returnValue
      },
      logf: function () {
        let returnValue = cowlog._makeLogger(1).apply(this, arguments)
        return returnValue
      },
      init: function () {
        cowlog.createConsoleMessage = require('./lib/message-creator')(cowlog)
        cowlog._sessionLogFile = this.makeLogFile(hrTime, 'session.log')
        this._makeLogger = require('./lib/logger')(cowlog, calculatedParamteres)
        let me = this
        process.on('exit', function () {
          if (me.lastLogs) {
            console.log(
              '\n----------------------------------------------------------------------------------------------------\n' +
              '----------------------------------------------------------------------------------------------------\n' +
              'The following log entry is shown here because asked for it to show it again before the program exits\n' +
              '----------------------------------------------------------------------------------------------------\n' +
              '----------------------------------------------------------------------------------------------------\n\n'
            )

            me.lastLogs.forEach(function (log) {
              let result = me.createConsoleMessage(calculatedParamteres, log, true, true)
              console.log(result)
            })
          }
        })
        if (calculatedParamteres.registerGlobal) {
          global.cowlog = cowlog
        }

        return cowlog
      }
    }

    return cowlog.init()
  }
}
