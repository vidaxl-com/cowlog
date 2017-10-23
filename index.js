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
    const cowlogDbDir = path.join(cowlogTmpDir, 'db/');

    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')

    let dbPath = path.join(cowlogDbDir, 'db.json');
    s.mkdir('-p', cowlogDbDir);
    const adapter = new FileSync(dbPath);
    const db = low(adapter)

    db.defaults({ sessions: [], logs_sessions: {}, hash_data:[]}).write();

    let cowlog = {

        path:{
            cowlogTmpDir: cowlogTmpDir,
            cowlogHashDir: cowlogHashDir,
            cowlogDbDir: cowlogDbDir
        },

        makeLogFile: function (  ) {

        },

        makeHash: function () {

        },

        createConsoleMessage: function () {
            
        },

        _db: db,

        _logs: [],

        _fileLogs: {},

        _collectedLogs: [],

        _sessionId: randomstring.generate(),

        //redefined at the init method.
        _makeLogger:function(){},

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

            cowlog.makeLogFile= require('./lib/logfile-creator')(this.path.cowlogHashDir, db);
            cowlog.createConsoleMessage = require('./lib/message-creator')(cowlog);
            cowlog._sessionLogFile= this.makeLogFile(hrTime, 'session.log');


            db.get('sessions')
                .push(cowlog._sessionId)
                .write()

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
