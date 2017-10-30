'use strict';

require('colors');
var stringifyObject = require('stringify-object');
var functionArguments = require('function-arguments');
var stackTrace = require('stacktrace-js');
var fs = require('fs');
var path = require('path');
var removeNumberOfEntitiesSelfReferncesFromStacktrace = 2;
var delimiterInFiles = '\n\n--------------------------------------------------\n--------------------------------------------------\n';

module.exports = function (messageCreator, hashCreator, logfileCreator, runtimeVariables) {
  var calculatedParameters = runtimeVariables.calculatedParameters;

  var logger = function logger(argumentsFrom) {
    var me = logger;

    logger._getInverseString = function (inverse, string) {
      if (inverse) {
        return string.inverse;
      }

      return string;
    };

    logger._printMsg = function (iterator, message) {
      var msg = message;
      if (calculatedParameters.alternateParameterPrint) {
        var isInverseColor = this._isInversePrint(iterator);
        msg = this._getInverseString(isInverseColor, message);
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
      var stack = stackTrace.getSync();
      var origArguments = arguments;

      var createBody = function createBody(colored) {
        var referenceFunctionArguments = false;
        if (argumentsFrom) {
          referenceFunctionArguments = functionArguments(origArguments[0]);
        }
        var originalArguments = origArguments;

        var logBody = '';
        var parametersLength = originalArguments.length;
        for (var i = argumentsFrom; i < parametersLength; i++) {
          var argumentName = i;
          if (referenceFunctionArguments) {
            argumentName = referenceFunctionArguments[i - argumentsFrom];
          }

          var newMsg = '';
          var value = originalArguments[i];
          var head = argumentName + ' Beginnig ---';
          if (calculatedParameters.alternateParameterHeadPrint) {
            head = me._getInverseString(colored, head);
          }
          head = '\n' + head + '\n';
          newMsg += head;
          var stringifyedParameter = stringifyObject(value, {
            indent: '  ',
            singleQuotes: false
          });
          newMsg += me._printMsg(i, stringifyedParameter);
          var foot = argumentName + ' End ---';
          if (calculatedParameters.alternateParameterFootPrint) {
            foot = me._getInverseString(colored, foot);
          }
          foot = '\n' + foot + '\n';
          newMsg += foot;
          logBody += newMsg;
        };

        return logBody;
      };

      for (var i = 0; i < removeNumberOfEntitiesSelfReferncesFromStacktrace; i++) {
        stack.shift();
      }

      stack.forEach(function (value) {
        var fileName = value.fileName;
        try {
          var fileContent = fs.readFileSync(fileName);
          value.fileLog = logfileCreator(fileContent, 'source.log' + path.extname(fileName));
          value.hash = hashCreator(value.filename + ' ' + value.functionName + ' ' + value.source + ' ' + value.fileLog + ' ' + value.columnNumber + ' ' + value.lineNumber);
        } catch (err) {}
      });

      var stackTraceString = logger._serialize(stack);

      var logEntry = {
        stackTraceFile: logfileCreator(stackTraceString, 'stack-trace.log'),
        sessionLog: runtimeVariables.sessionLogFile,
        calledFrom: stack[0],
        stack: stack,
        logBody: createBody(true),
        dateTime: new Date().toISOString()
      };

      var returnLevel = 0;
      var returnFunction = function returnFunction(options) {
        returnLevel++;
        var returnValue = returnFunction;
        logEntry.hashes = logEntry.hashes || [];

        if (options) {
          logEntry.options = options;
          if (options === 'die') {
            process.exit();
          }
          if (options === 'last') {
            runtimeVariables.lastLogs = [logEntry];
          }
          if (options === 'lasts') {
            runtimeVariables.lastLogs = runtimeVariables.lastLogs || [];
            runtimeVariables.lastLogs.push(logEntry);
          }
          if (options === 'return') {
            returnValue = origArguments[origArguments.length - 1];
          }
        }

        if (returnLevel === 1) {
          var result = messageCreator(calculatedParameters, logEntry, true, true);
          console.log(result.toString());
          logEntry.logBody = createBody(false);
          var consoleMessage = '\n' + messageCreator(calculatedParameters, logEntry, false, false) + delimiterInFiles;
          fs.appendFileSync(runtimeVariables.sessionLogFile, consoleMessage);
          runtimeVariables.collectedLogs.push(messageCreator(calculatedParameters, logEntry, false, false));
        }

        return returnValue;
      };

      return returnFunction();
    };
  };

  return logger;
};