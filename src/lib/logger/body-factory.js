'use strict'
const stringifyObject = require('stringify-object')
const functionArguments = require('function-arguments')

module.exports = exports = function (container) {
  module.dictionary = container.dictionary
  module['logger-print-helpers'] = container['logger-print-helpers']

  return function (colored, argumentsFrom, originalArguments, calculatedParameters, loggerPrintHelpers) {
    let referenceFunctionArguments = false
    if (argumentsFrom) {
      referenceFunctionArguments = functionArguments(originalArguments[0])
    }

    return module.createBody(colored, argumentsFrom, referenceFunctionArguments, originalArguments, calculatedParameters,
      loggerPrintHelpers)
  }
}

module.createArgumentName = function extracted (referenceFunctionArguments, argumentsFrom, iterator) {
  let argumentName = iterator
  if (referenceFunctionArguments) {
    argumentName = referenceFunctionArguments[(iterator - argumentsFrom)]
  }

  return argumentName
}

module.createArgumentDelimiter = function (text, colored, argumentName) {
  let delimiter = argumentName + ` ${text} ${module.dictionary.argumentNameDelimiter}---`
  delimiter = module['logger-print-helpers'].getInverseString(colored, delimiter)
  delimiter = '\n' + delimiter + '\n'
  return delimiter
}

module.createBody = function extracted (colored, argumentsFrom, referenceFunctionArguments, originalArguments,
                                        calculatedParameters, loggerPrintHelpers) {
  let logBody = ''
  let parametersLength = originalArguments.length
  for (let i = argumentsFrom; i < parametersLength; i++) {
    let argumentName = module.createArgumentName(referenceFunctionArguments, argumentsFrom, i)
    let newMsg = ''
    newMsg += module.createArgumentDelimiter(module.dictionary.beginning, colored, argumentName, calculatedParameters, loggerPrintHelpers)
    let value = originalArguments[i]
    let stringifyedParameter = stringifyObject(value, {
      indent: '  ',
      singleQuotes: false
    })
    newMsg += stringifyedParameter
    newMsg += module.createArgumentDelimiter(module.dictionary.end, colored, argumentName, calculatedParameters, loggerPrintHelpers)
    logBody += newMsg
  }

  return logBody
}
