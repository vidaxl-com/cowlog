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
    const fs = require('fs');
    const os = require('os');
    const path = require('path');
    const fsPath = require('fs-path');
    const sha256 = require('sha256');

    const removeNumberOfEntitiesSelfReferncesFromStacktrace = 2;
    const hrTime = process.hrtime();

    const tmpDir = os.tmpdir();
    const cowlogTmpDir = path.join(tmpDir,'cowlog/');
    const delimiterInFiles = '\n\n--------------------------------------------------\n--------------------------------------------------\n';

    const createConsoleMessage = require('./lib/message-creator');


    var exec = require('child_process').exec;

    const makeLogFile = require('./lib/logfile-creator');

    let cowlog = {

        _fileLogs: {},

        _collectedLogs: [],

        _sessionLogFile: makeLogFile(hrTime, cowlogTmpDir, 'session.log'),

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
                    let fileName = value.fileName;
                    try {
                        let fileContent = fs.readFileSync(fileName);
                        value.fileLog = makeLogFile(fileContent, 'source.log' + path.extname(fileName))
                    }
                    catch (err){

                    }
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


                let result = createConsoleMessage(calculatedParamteres, logEntry, true, true);
                console.log(result);
                logEntry.logBody = createBody(false);
                let consoleMessage = '\n' + createConsoleMessage(calculatedParamteres, logEntry, false, false) + delimiterInFiles;
                fs.appendFileSync(me._sessionLogFile, consoleMessage);
                fs.appendFileSync(logEntry.fileLoggedFromHash, consoleMessage);

                me._collectedLogs.push(createConsoleMessage(calculatedParamteres, logEntry,false,false));
                return function(options){
                    if(options){
                        if (options == 'die'){
                            process.exit();
                        }
                        if (options == 'last'){
                            me.lastLogs = [logEntry];
                        }
                    }
                }
            }
        },


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
            let me = this;


            process.on('exit', function () {
                if (me.lastLogs){
                    let result = createConsoleMessage(calculatedParamteres, me.lastLogs[0], true, true);
                    console.log(
                        "\n----------------------------------------------------------------------------------------------------\n" +
                        "----------------------------------------------------------------------------------------------------\n" +
                        "The following log entry is shown here because asked for it to show it again before the program exits\n" +
                        "----------------------------------------------------------------------------------------------------\n" +
                        "----------------------------------------------------------------------------------------------------\n\n"
                    );
                    console.log(result);
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
