'use strict';

module.exports = function (parameters) {
    const colors = require('colors');

    const calculatedParamteres = require('./app/configParser')(parameters);
    // const s = require('shelljs');
    const os = require('os');
    const path = require('path');

    const hrTime = process.hrtime();

    const tmpDir = os.tmpdir();
    const cowlogTmpDir = path.join(tmpDir,'cowlog/');

    const createConsoleMessage = require('./lib/message-creator');
    const makeLogFile = require('./lib/logfile-creator');

    let cowlog = {

        _fileLogs: {},

        _collectedLogs: [],

        _sessionLogFile: makeLogFile(hrTime, cowlogTmpDir, 'session.log'),

        //redefined at the init method.
        _makeLogger:function(){},


        log: function(){
            return cowlog._makeLogger(0).apply(this,arguments);
        },

        logf: function(){
            return cowlog._makeLogger(1).apply(this,arguments);
        },

        logFucntion:function(){
            return cowlog.logf().apply(this,arguments);
        },

        init: function () {
            this._makeLogger = require('./lib/logger')(cowlog, calculatedParamteres);
            let me = this;

            process.on('exit', function () {
                if (me.lastLogs){
                    console.log(
                        "\n----------------------------------------------------------------------------------------------------\n" +
                        "----------------------------------------------------------------------------------------------------\n" +
                        "The following log entry is shown here because asked for it to show it again before the program exits\n" +
                        "----------------------------------------------------------------------------------------------------\n" +
                        "----------------------------------------------------------------------------------------------------\n\n"
                    );

                    me.lastLogs.forEach(function (log) {
                        let result = createConsoleMessage(calculatedParamteres, log, true, true);
                        console.log(result);
                    })
                }
            });

            if(calculatedParamteres.registerGlobal){
                global.cowlog = cowlog;
            }

            return this;
        }
    };

    return cowlog.init();
};
