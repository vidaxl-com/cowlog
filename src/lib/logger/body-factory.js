'use strict'
const stringifyObject = require('stringify-object')
const functionArguments = require('function-arguments')

module.exports = function (colored, argumentsFrom, origArguments, calculatedParameters, loggerPrintHelpers) {
  let referenceFunctionArguments = false
  if (argumentsFrom) {
    referenceFunctionArguments = functionArguments(origArguments[0])
  }
  let originalArguments = origArguments

  let logBody = ''
  let parametersLength = originalArguments.length
  for (let i = argumentsFrom; i < parametersLength; i++) {
    let argumentName = i
    if (referenceFunctionArguments) {
      argumentName = referenceFunctionArguments[(i - argumentsFrom)]
    }

    let newMsg = ''
    let value = originalArguments[i]
    let head = argumentName + ' Beginnig ---'
    if (calculatedParameters.alternateParameterHeadPrint) {
      head = loggerPrintHelpers.getInverseString(colored, head)
    }
    head = '\n' + head + '\n'
    newMsg += head
    let stringifyedParameter = stringifyObject(value, {
      indent: '  ',
      singleQuotes: false
    })
    newMsg += loggerPrintHelpers.printMsg(i, stringifyedParameter)
    let foot = argumentName + ' End ---'
    if (calculatedParameters.alternateParameterFootPrint) {
      foot = loggerPrintHelpers.getInverseString(colored, foot)
    }
    foot = '\n' + foot + '\n'
    newMsg += foot
    logBody += newMsg
  }

  return logBody
}