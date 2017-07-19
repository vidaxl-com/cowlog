'use strict';

module.exports = function (parameters) {
    const cowsay = require('cowsay');
    const stringifyObject = require('stringify-object');
    const colors = require('colors');
    const isEven = require('is-even');
    const merge = require('merge');
    const functionArguments = require('function-arguments');


    parameters = parameters || {};

    let defaultParameters = {
        alternateParameterPrint: true,
        // face: 'default'
        face: function () {
            let faces = ['beavis.zen','bong','bud-frogs','bunny','cheese','cower','daemon','default','doge','dragon','dragon-and-cow','elephant','elephant-in-snake','eyes','flaming-sheep','ghostbusters','goat','head-in','hedgehog','hellokitty','kiss','kitty','koala','kosh','luke-koala','mech-and-cow','meow','milk','moofasa','moose','mutilated','ren','satanic','sheep','skeleton','small','sodomized','squirrel','stegosaurus','stimpy','supermilker','surgery','telebears','turkey','turtle','tux','vader','vader-koala','whale','www'];
            return faces[Math.floor(Math.random()*faces.length)];
        }(),
        activity:function(){
            let activities = [cowsay.say,cowsay.think];
            return activities[Math.floor(Math.random()*activities.length)];
        }()
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
                }
                ;

                console.log(calculatedParamteres.activity({
                    text: msg,
                    e: "oO",
                    T: "U ",
                    f: calculatedParamteres.face
                }));
            }
        },

        log: function(){
            cowlog._makeLogger(0).apply(this,arguments);
        },

        logf: function(){
            cowlog._makeLogger(1).apply(this,arguments);
        },

        logFucntion:function () {
            return cowlog.logf()
        }
    };

    return cowlog;
};
