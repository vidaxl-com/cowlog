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
    const s = require('shelljs');
    const fs = require('fs');

    let cowlog = {

        _printMsg : function (iterator, message) {
            let msg = '';

            if (calculatedParamteres.alternateParameterPrint){
                let isInverseColor = isEven(iterator);

                if (isInverseColor) {
                    msg += message.inverse;
                }
                if (!isInverseColor) {
                    msg += message;
                }
            }
            if(!calculatedParamteres.alternateParameterPrint){
                msg = message;
            }

            return msg;
        },

        _makeLogger:function(argumentsFrom) {

            return function () {
                let referenceFunctionArguments = false;
                if(argumentsFrom){
                    referenceFunctionArguments = functionArguments(arguments[0]);
                }
                let originalArguments = arguments
                let stack = stackTrace.getSync()

                let msg = '';
                let parametersLength = originalArguments.length
                for (let i = argumentsFrom; i < parametersLength; i++) {
                    let argumentName = i;
                    if(referenceFunctionArguments){
                        argumentName = referenceFunctionArguments[ (i-argumentsFrom) ]
                    }

                    let newMsg = '';
                    let value = originalArguments[i];
                    let head = '\n' + argumentName + ' Beginnig ---\n';
                    newMsg += head;
                    let stringifyedParameter = stringifyObject(value, {
                        indent: '  ',
                        singleQuotes: false
                    });
                    newMsg += cowlog._printMsg(i, stringifyedParameter);
                    let foot = '\n' + argumentName + ' End ---\n';
                    newMsg += foot;
                    msg += newMsg;
                };
                let stackTraceString = stringifyObject(stack, {
                    indent: '  ',
                    singleQuotes: false
                });
                parametersLength++;
                let stackTraceFile = '/tmp/' + 'cowlog_stacktrace_' + randomstring.generate();
                s.touch(stackTraceFile);
                fs.writeFileSync(stackTraceFile, stackTraceString);

                msg += '\n__--------------------__\nstack trace:\n' + stackTraceFile;

                let result = '';
                let weHaveCartoon = calculatedParamteres.face;
                if(weHaveCartoon){
                    result = calculatedParamteres.activity({
                        text: msg,
                        e: "oO",
                        T: "U ",
                        f: calculatedParamteres.face
                    })
                }
                if(!weHaveCartoon){
                    result = msg;
                }
                console.log(result);
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
        }
    };

    if(calculatedParamteres.registerGlobal){
        global.cowlog = cowlog;
    }

    return cowlog;
};
