'use strict';

module.exports = function (parameters) {
    const cowsay = require('cowsay');
    const stringifyObject = require('stringify-object');
    const colors = require('colors');
    const isEven = require('is-even');
    const merge = require('merge');

    parameters = parameters || {};

    let defaultParameters = {
        alternateParameterPrint: true,
        // face: 'default'
        face: 'flaming-sheep'
    };

    let calculatedParamteres =  merge(parameters, defaultParameters);

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
            if(!parameters.alternateParameterPrint){
                msg = message;
            }

            return msg;
        },

        _makeLogger:function(argumentsFrom) {
            return function () {
                let msg = '';
                for (let i = argumentsFrom; i < arguments.length; i++) {
                    let newMsg = '';
                    let value = arguments[i];
                    let head = '\n--- Beginnig Parameter ' + i + '. ---\n'
                    newMsg += head;
                    let stringifyedParameter = stringifyObject(value, {
                        indent: '  ',
                        singleQuotes: false
                    });
                    newMsg += cowlog._printMsg(i, stringifyedParameter);
                    let foot = '\n--- End Parameter ' + i + '. ---\n';
                    newMsg += foot;
                    msg += newMsg;
                }
                ;

                console.log(cowsay.say({
                    text: msg,
                    e: "oO",
                    T: "U ",
                    f: calculatedParamteres.face
                }));
            }
        },

        log: function(){
            cowlog._makeLogger(0).apply(this,arguments)
        }
    };

    // logFunction: function (function) {
    //
    // }

    return cowlog;
};
