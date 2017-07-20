'use strict';

module.exports = function (parameters) {
    const cowsay = require('cowsay');
    const stringifyObject = require('stringify-object');
    const colors = require('colors');
    const isEven = require('is-even');
    const merge = require('merge');
    const functionArguments = require('function-arguments');
    const calculatedParamteres = require('./app/configParser')(parameters);

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
                let msg = '';
                for (let i = argumentsFrom; i < arguments.length; i++) {
                    let argumentName = i;
                    if(referenceFunctionArguments){
                        argumentName = referenceFunctionArguments[ (i-argumentsFrom) ]
                    }

                    let newMsg = '';
                    let value = arguments[i];
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
