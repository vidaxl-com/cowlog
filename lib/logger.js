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
const sha256 = require('sha256');

const removeNumberOfEntitiesSelfReferncesFromStacktrace = 2;

const delimiterInFiles = '\n\n--------------------------------------------------\n--------------------------------------------------\n';

const createConsoleMessage = require('./message-creator');

const makeLogFile = require('./logfile-creator');

module.exports = function( cowlog, calculatedParamteres ){

    let logger = function(argumentsFrom) {
        let me = logger
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
                    newMsg += me._printMsg(i, stringifyedParameter);
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
                    value.fileLog = makeLogFile(fileContent, '/tmp/cowlog/', 'source.log' + path.extname(fileName))
                }
                catch (err){

                }
            })

            let stackTraceString = me._serialize(stack);

            let logEntry = {
                stackTraceFile: makeLogFile(stackTraceString, '/tmp/cowlog/', 'stack-trace.log'),
                sessionLog: cowlog._sessionLogFile,
                calledFrom: stack[0],
                stack: stack,
                logBody: createBody(true),
                dateTime: new Date().toISOString()
            };


            let result = createConsoleMessage(calculatedParamteres, logEntry, true, true);
            console.log(result);
            logEntry.logBody = createBody(false);
            let consoleMessage = '\n' + createConsoleMessage(calculatedParamteres, logEntry, false, false) + delimiterInFiles;
            fs.appendFileSync(cowlog._sessionLogFile, consoleMessage);
            fs.appendFileSync(logEntry.fileLoggedFromHash, consoleMessage);

            cowlog._collectedLogs.push(createConsoleMessage(calculatedParamteres, logEntry,false,false));
            let returnFunction = function(options){
                if(options){
                    if (options == 'die'){
                        process.exit();
                    }
                    if (options == 'last'){
                        cowlog.lastLogs = [logEntry];
                    }
                    if (options == 'lasts'){
                        cowlog.lastLogs = cowlog.lastLogs || []
                        cowlog.lastLogs.push(logEntry);
                    }
                }

                return returnFunction;
            }

            return returnFunction();
        }
    };

    logger._isInversePrint = function (iterator) {
        return isEven(iterator);
    };

    logger._getInverseString = function (inverse, string) {
        if(inverse){

            return string.inverse
        }

        return string
    };

    logger._printMsg = function (iterator, message) {
        let msg = message;
        if (calculatedParamteres.alternateParameterPrint){
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


    return logger;
};
