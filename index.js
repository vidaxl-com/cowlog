'use strict';

module.exports = function (parameters) {
    const cowsay = require('cowsay');
    const stringifyObject = require('stringify-object');
    const colors = require('colors');
    const isEven = require('is-even');
    const merge = require('merge');

    parameters = parameters || {};

    let defaultParameters = {
        alternateParameterPrint: true
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

        log: function () {
            let msg = '';
            for (let i = 0; i < arguments.length; i++) {
                let newMsg = '';
                let value = arguments[i];

                newMsg += '\n--- Beginnig Parameter ' + i + '. ---\n';
                let stringifyedParameter = stringifyObject(value, {
                    indent: '  ',
                    singleQuotes: false
                });
                newMsg += stringifyedParameter;
                newMsg += '\n--- End Parameter ' + i + '. ---\n';
                console.log(newMsg);
                console.log(cowlog._printMsg(i, newMsg));
                msg += cowlog._printMsg(i, newMsg);
            };

            console.log(cowsay.say({
                text: msg,
                e: "oO",
                T: "U "
            }));
        }
    };

    return cowlog;
};
