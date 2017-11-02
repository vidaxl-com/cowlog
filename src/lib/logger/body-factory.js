'use strict'
const stringifyObject = require('stringify-object')
const functionArguments = require('function-arguments')

module.exports = exports = function (colored, argumentsFrom, originalArguments, calculatedParameters, loggerPrintHelpers) {
  let referenceFunctionArguments = false
  if (argumentsFrom) {
    referenceFunctionArguments = functionArguments(originalArguments[0])
  }

  return module.createBody(colored, argumentsFrom, referenceFunctionArguments, originalArguments, calculatedParameters,
                                                                                                     loggerPrintHelpers)
}
module.createArgumentName = function extracted (referenceFunctionArguments, argumentsFrom, iterator) {
  let argumentName = iterator
  if (referenceFunctionArguments) {
    argumentName = referenceFunctionArguments[(iterator - argumentsFrom)]
  }

  return argumentName
}

module.createArgumentDelimiter = function (text, colored, argumentName, calculatedParameters, loggerPrintHelpers) {
  let delimiter = argumentName + ` ${text} ---`
  if (calculatedParameters.alternateParameterHeadPrint) {
    delimiter = loggerPrintHelpers.getInverseString(colored, delimiter)
  }
  delimiter = '\n' + delimiter + '\n'

  return delimiter
}

module.createBody = function extracted (colored, argumentsFrom, referenceFunctionArguments, originalArguments,
                                                                             calculatedParameters, loggerPrintHelpers) {
  let logBody = '';
  let parametersLength = originalArguments.length
  for (let i = argumentsFrom; i < parametersLength; i++) {
    let argumentName = module.createArgumentName(referenceFunctionArguments, argumentsFrom, i)
    let newMsg = ''
    newMsg += module.createArgumentDelimiter('Beginnig', colored, argumentName, calculatedParameters, loggerPrintHelpers)
    let value = originalArguments[i]
    let stringifyedParameter = stringifyObject(value, {
      indent: '  ',
      singleQuotes: false
    })
    newMsg += stringifyedParameter
    newMsg += module.createArgumentDelimiter('End', colored, argumentName, calculatedParameters, loggerPrintHelpers)
    logBody += newMsg
  }

  return logBody
}