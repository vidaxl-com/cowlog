'use strict';

const makeLogFile = require('./logfile-creator');
module.exports =  function (parameters, logEntry, colored, cartoon) {
    let msg = '';
    msg += logEntry.logBody
    let delimiterLine = '\n' + '_-_-_-_-_-_-_-_-_-_-_-_' + '\n'
    if(colored) {
        let delimiterLine = '\n' + '_-_-_-_-_-_-_-_-_-_-_-_'.inverse + '\n'
        msg += delimiterLine + 'called from:'.inverse + ' ';
    }
    if(!colored){
        msg += delimiterLine + 'called from:' + ' ';
    }
    let fileLoggedFrom = logEntry.calledFrom.fileName;
    msg +=
        fileLoggedFrom + ':' +
        logEntry.calledFrom.lineNumber + ':' +
        logEntry.calledFrom.columnNumber;

    logEntry.fileLoggedFromHash = makeLogFile(fileLoggedFrom, '/tmp/cowlog', 'file.log');

    if(colored){
        msg += '\n' + 'stack trace:'.inverse + ' ';
    }
    if(!colored) {
        msg += '\n' + 'stack trace:' + ' ';
    }
    msg += logEntry.stackTraceFile;

    if(colored){
        msg += '\n' + 'session log:'.inverse + ' ';
    }
    if(!colored) {
        msg += '\n' + 'session log:' + ' ';
    }
    msg += logEntry.sessionLog;

    if(colored){
        msg += '\n' + 'file log:'.inverse + ' ';
    }
    if(!colored) {
        msg += '\n' + 'file log:' + ' ';
    }
    msg += logEntry.fileLoggedFromHash;

    if(colored){
        msg += '\n' + 'logged at file:'.inverse + ' ';
    }
    if(!colored) {
        msg += '\n' + 'logged at file:' + ' ';
    }
    msg += logEntry.dateTime;

    let weHaveCartoon = parameters.face;
    if(weHaveCartoon && cartoon){
        msg = parameters.activity({
            text: msg,
            e: "oO",
            T: "U ",
            f: parameters.face
        })
    }

    return msg;
};