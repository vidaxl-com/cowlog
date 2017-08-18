'use strict';

module.exports = function (parameters) {
    const cowsay = require('cowsay');
    const stringifyObject = require('stringify-object');
    const colors = require('colors');
    const isEven = require('is-even');
    const merge = require('merge');
    const functionArguments = require('function-arguments');
    const calculatedParamteres = require('./app/configParser')(parameters);
    const stackTrace = require('stacktrace-js');
    const randomstring = require("randomstring");
    // const s = require('shelljs');
    var fs = require('fs');
    const os = require('os');
    const path = require('path');
    const fsPath = require('fs-path');
    const sha256 = require('sha256');

    const removeNumberOfEntitiesSelfReferncesFromStacktrace = 2;
    const hrTime = process.hrtime();

    const tmpDir = os.tmpdir();
    const cowlogTmpDir = path.join(tmpDir,'cowlog/');
    const delimiterInFiles = '\n\n--------------------------------------------------\n--------------------------------------------------\n';

    const makeLogFile = function (string, logTypeString) {

        const _insertToString= function(str, index, value) {
            return str.substr(0, index) + value + str.substr(index);
        };

        const _makeFileNameHashPath = function (string) {
            return _insertToString(sha256(string),2,'/')
        };

        const _makeHashPath = function(relativeFilePath, logTypeString){
            if(!logTypeString){
                logTypeString = '.log';
            }
            return path.join(cowlogTmpDir + relativeFilePath) + logTypeString;
        };

        const _makeHash = function(string){
            return sha256(string)
        };

        let hash = _makeHash(string);
        let relativeFilePath = _makeFileNameHashPath(hash);
        let filePath = _makeHashPath(relativeFilePath, '_' + logTypeString);

        if (!fs.existsSync(filePath)) {
            fsPath.writeFileSync(filePath, string)
        }

        return filePath;
    };

    let cowlog = {

        _fileLogs: {},

        _collectedLogs: [],

        _sessionLogFile: makeLogFile(hrTime, 'session.log'),

        _isInversePrint: function (iterator) {
            return isEven(iterator);
        },

        _getInverseString: function (inverse, string) {
            if(inverse){

                return string.inverse
            }

            return string
        },

        _printMsg : function (iterator, message) {
            let msg = message;
            if (calculatedParamteres.alternateParameterPrint){
                let isInverseColor = this._isInversePrint(iterator);
                msg = this._getInverseString(isInverseColor, message)
            }

            return msg;
        },

        _serialize : function (data) {
            return stringifyObject(data, {
                indent: '  ',
                singleQuotes: false
            });
        },

        _makeLogger:function(argumentsFrom) {
            let me = this;

            return function () {
                let stack = stackTrace.getSync();
                let origArguments = arguments
                const createBody = function (colored) {
                    let referenceFunctionArguments = false;
                    if(argumentsFrom){
                        referenceFunctionArguments = functionArguments(origArguments[0]);
                    }
                    let originalArguments = origArguments

                    let logBody = ''
                    let parametersLength = originalArguments.length
                    for (let i = argumentsFrom; i < parametersLength; i++) {
                        let argumentName = i;
                        if(referenceFunctionArguments){
                            argumentName = referenceFunctionArguments[ (i-argumentsFrom) ]
                        }

                        let newMsg = '';
                        let value = originalArguments[i];
                        let head = argumentName + ' Beginnig ---';
                        if (calculatedParamteres.alternateParameterHeadPrint){
                            head = me._getInverseString(colored, head);
                        }
                        head = '\n' + head + '\n';
                        newMsg += head;
                        let stringifyedParameter = stringifyObject(value, {
                            indent: '  ',
                            singleQuotes: false
                        });
                        newMsg += cowlog._printMsg(i, stringifyedParameter);
                        let foot = argumentName + ' End ---';
                        if (calculatedParamteres.alternateParameterFootPrint){
                            foot = me._getInverseString(colored, foot);
                        }
                        foot = '\n' + foot + '\n';
                        newMsg += foot;
                        logBody += newMsg;
                    };
                    return logBody
                };

                for (let i = 0; i < removeNumberOfEntitiesSelfReferncesFromStacktrace; i++){
                    stack.shift();
                }

                stack.forEach(function (value) {
                    value.fileLog = makeLogFile(fs.readFileSync(value.fileName), 'source.log' + path.extname(value.fileName)),
                    console.log(value)
                })

                let stackTraceString = me._serialize(stack);

                let logEntry = {
                    stackTraceFile: makeLogFile(stackTraceString, 'stack-trace.log'),
                    sessionLog: me._sessionLogFile,
                    calledFrom: stack[0],
                    stack: stack,
                    logBody: createBody(true),
                    dateTime: new Date().toISOString()
                };

                let createConsoleMessage = function (logEntry, colored, cartoon) {
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

                    logEntry.fileLoggedFromHash = makeLogFile(fileLoggedFrom, 'file.log');

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

                    let weHaveCartoon = calculatedParamteres.face;
                    if(weHaveCartoon && cartoon){
                        msg = calculatedParamteres.activity({
                            text: msg,
                            e: "oO",
                            T: "U ",
                            f: calculatedParamteres.face
                        })
                    }

                    return msg;
                };

                let result = createConsoleMessage(logEntry, true, true);
                console.log(result);
                logEntry.logBody = createBody(false);
                let consoleMessage = '\n' + createConsoleMessage(logEntry, false, false) + delimiterInFiles;
                fs.appendFileSync(me._sessionLogFile, consoleMessage);
                fs.appendFileSync(logEntry.fileLoggedFromHash, consoleMessage);

                me._collectedLogs.push(createConsoleMessage(logEntry));

            }
        },


        log: function(){
            cowlog._makeLogger(0).apply(this,arguments);
        },

        logf: function(){
            cowlog._makeLogger(1).apply(this,arguments);
        },

        logFucntion:function(){
            return cowlog.logf().apply(this,arguments);
        },

        init: function () {
            let me = this;
            process.on('exit', function () {
                let allLogs = me._collectedLogs;
                let msg = '';
                allLogs.forEach(function (value, i) {
                    // msg += '\n' + value + '\n\n--------------------------------------------------\n--------------------------------------------------\n';
                    // fs.appendFileSync(me._sessionLogFile, msg)
                })
                // fs.writeFileSync(me._sessionLogFile, msg)
            });

            if(calculatedParamteres.registerGlobal){
                global.cowlog = cowlog;
            }

            return this;
        }
    };

    return cowlog.init();
};
