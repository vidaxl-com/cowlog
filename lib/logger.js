'use strict';

const cowsay = require('cowsay');
const stringifyObject = require('stringify-object');
const colors = require('colors');
// const isEven = require('is-even');
const functionArguments = require('function-arguments');
const stackTrace = require('stacktrace-js');
const randomstring = require("randomstring");
// const s = require('shelljs');
const fs = require('fs');

const path = require('path');
const fsPath = require('fs-path');

const removeNumberOfEntitiesSelfReferncesFromStacktrace = 2;

const delimiterInFiles = '\n\n--------------------------------------------------\n--------------------------------------------------\n';

const createConsoleMessage = require('./message-creator');

const haser = require('object-hash');

const readline = require('readline');

function get_line(filename, line_no, callback) {
    var data = fs.readFileSync(filename, 'utf8');
    var lines = data.split("\n");

    if(+line_no > lines.length){
        throw new Error('File end reached without finding line');
    }

    callback(null, lines[+line_no]);
}

module.exports = function( cowlog, calculatedParamteres ) {

    const db = require('./hash-creator')(cowlog._db);
    const hashCreator = require('./hash-creator')(db);

    const makeLogFile = cowlog.makeLogFile;
    let logger = function (argumentsFrom) {
        let me = logger
        logger._isInversePrint = function (iterator) {
            return isEven(iterator);
        };

        logger._getInverseString = function (inverse, string) {
            if (inverse) {

                return string.inverse
            }

            return string
        };

        logger._printMsg = function (iterator, message) {
            let msg = message;
            if (calculatedParamteres.alternateParameterPrint) {
                let isInverseColor = this._isInversePrint(iterator);
                msg = this._getInverseString(isInverseColor, message)
            }

            return msg;
        };

        logger._serialize = function (data) {
            return stringifyObject(data, {
                indent: '  ',
                singleQuotes: false
            });
        };


        return function () {
            let stack = stackTrace.getSync();
            let origArguments = arguments
            const createBody = function (colored) {
                let referenceFunctionArguments = false;
                if (argumentsFrom) {
                    referenceFunctionArguments = functionArguments(origArguments[0]);
                }
                let originalArguments = origArguments

                let logBody = ''
                let parametersLength = originalArguments.length
                for (let i = argumentsFrom; i < parametersLength; i++) {
                    let argumentName = i;
                    if (referenceFunctionArguments) {
                        argumentName = referenceFunctionArguments[(i - argumentsFrom)]
                    }

                    let newMsg = '';
                    let value = originalArguments[i];
                    let head = argumentName + ' Beginnig ---';
                    if (calculatedParamteres.alternateParameterHeadPrint) {
                        head = me._getInverseString(colored, head);
                    }
                    head = '\n' + head + '\n';
                    newMsg += head;
                    let stringifyedParameter = stringifyObject(value, {
                        indent: '  ',
                        singleQuotes: false
                    });
                    newMsg += me._printMsg(i, stringifyedParameter);
                    let foot = argumentName + ' End ---';
                    if (calculatedParamteres.alternateParameterFootPrint) {
                        foot = me._getInverseString(colored, foot);
                    }
                    foot = '\n' + foot + '\n';
                    newMsg += foot;
                    logBody += newMsg;
                };

                return logBody
            };

            for (let i = 0; i < removeNumberOfEntitiesSelfReferncesFromStacktrace; i++) {
                stack.shift();
            }

            stack.forEach(function (value) {
                let fileName = value.fileName;
                try {
                    let fileContent = fs.readFileSync(fileName);
                    value.fileLog = makeLogFile(fileContent, 'source.log' + path.extname(fileName))
                    value.hash = hashCreator(value.filename + ' ' + value.functionName + ' ' + value.source + ' ' + value.fileLog
                        + ' ' + value.columnNumber + ' ' + value.lineNumber
                    );
                }
                catch (err) {

                }
            })

            let stackTraceString = logger._serialize(stack);

            let logEntry = {
                stackTraceFile: makeLogFile(stackTraceString, 'stack-trace.log'),
                sessionLog: cowlog._sessionLogFile,
                calledFrom: stack[0],
                stack: stack,
                logBody: createBody(true),
                dateTime: new Date().toISOString()
            };

            let returnFunction = function (options) {
                let returnValue = returnFunction;
                logEntry.hashes = logEntry.hashes || [];

                    if (options) {
                        logEntry.options = options;
                        if (options === 'die') {
                            process.exit();
                        }
                        if (options === 'last') {
                            cowlog.lastLogs = [logEntry];
                        }
                        if (options === 'lasts') {
                            cowlog.lastLogs = cowlog.lastLogs || []
                            cowlog.lastLogs.push(logEntry);
                        }
                        if (options === 'return') {
                            returnValue = (origArguments[origArguments.length - 1]);
                        }
                        if (options === 'returnLast') {
                            returnValue = returnFunction('return');
                        }
                    }

                    let result = createConsoleMessage(cowlog)(calculatedParamteres, logEntry, true, true);
                    console.log(result.toString());
                    logEntry.logBody = createBody(false);
                    let consoleMessage = '\n' + createConsoleMessage(calculatedParamteres, logEntry, false, false) + delimiterInFiles;
                    fs.appendFileSync(cowlog._sessionLogFile, consoleMessage);
                    //todo: fix
                    // fs.appendFileSync(logEntry.fileLoggedFromHash, consoleMessage);
                    let s = 'logs_sessions.' + cowlog._sessionId
                    let data = !cowlog._db.get(s)
                    if (!data) {
                        data = [];
                    }

                    if (data) {
                        data.push(logEntry);
                    }
                    cowlog._db.set(s, data).write()
                    cowlog._collectedLogs.push(createConsoleMessage(calculatedParamteres, logEntry, false, false));

                    return returnValue;
            }
            return returnFunction()
        };
    }
    return logger;
}
