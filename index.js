// require('@vidaxl/cowlog')()
'use strict';
module.exports = function (parameters) {
    const colors = require('colors');

    const calculatedParamteres = require('./app/configParser')(parameters);
    const s = require('shelljs');
    const os = require('os');
    const path = require('path');
    const randomstring = require("randomstring");
    const hrTime = process.hrtime();
    const tmpDir = os.tmpdir();
    const cowlogTmpDir = path.join(tmpDir,'cowlog/');
    const cowlogHashDir = path.join(cowlogTmpDir, 'hashes/');

    let cowlog = {
        path:{
            cowlogTmpDir: cowlogTmpDir,
            cowlogHashDir: cowlogHashDir
        },
        makeLogFile: require('./lib/logfile-creator')(cowlogHashDir),
        _logs: [],
        _fileLogs: {},
        _collectedLogs: [],
        _sessionId: randomstring.generate(),
        log: function(){
            let returnValue = cowlog._makeLogger(0).apply(this,arguments);
            return returnValue;
        },
        logf: function(){
            let returnValue = cowlog._makeLogger(1).apply(this,arguments);
            return returnValue;
        },
        logFucntion:function(){
            return cowlog.logf().apply(this,arguments);
        },
        init: function () {
            cowlog.createConsoleMessage = require('./lib/message-creator')(cowlog);
            cowlog._sessionLogFile= this.makeLogFile(hrTime, 'session.log');
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

            return cowlog;
        }
    };

    return cowlog.init();
};
