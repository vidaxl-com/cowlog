'use strict';

module.exports = function (logger, messageCreator, runtimeVariables) {
  return function () {
    var cowlog = {
      log: function log() {
        var returnValue = logger(0).apply(this, arguments);
        return returnValue;
      },
      logf: function logf() {
        var returnValue = logger(1).apply(this, arguments);
        return returnValue;
      },
      init: function init() {
        process.on('exit', function () {
          if (runtimeVariables.lastLogs) {
            console.log('\n----------------------------------------------------------------------------------------------------\n' + '----------------------------------------------------------------------------------------------------\n' + 'The following log entry is shown here because asked for it to show it again before the program exits\n' + '----------------------------------------------------------------------------------------------------\n' + '----------------------------------------------------------------------------------------------------\n\n');

            runtimeVariables.lastLogs.forEach(function (log) {
              var result = messageCreator(runtimeVariables.calculatedParameters, log, true, true);
              console.log(result);
            });
          }
        });
        if (runtimeVariables.calculatedParameters.registerGlobal) {
          global.cowlog = cowlog;
        }

        return cowlog;
      }
    };

    return cowlog.init();
  };
};