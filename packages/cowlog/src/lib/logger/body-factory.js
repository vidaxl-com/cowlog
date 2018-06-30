'use strict'
const stringifyObject = require('stringify-object')
const functionArguments = require('function-arguments')
const flatten = require('flat')
const isObject = require('isobject')

//todo: Needs refactoring!
const weGotMarkdown = process.env.markdown;

module.exports = exports = function (container) {
  module.dictionary = container.dictionary
  module['logger-print-helpers'] = container['logger-print-helpers']

  return function (colored, argumentsFrom, originalArguments, calculatedParameters, loggerPrintHelpers) {
    let referenceFunctionArguments = false
    if (argumentsFrom) {
      referenceFunctionArguments = functionArguments(originalArguments[0])
    }

    return module.createBody(colored, argumentsFrom, referenceFunctionArguments, originalArguments,
                                                                               calculatedParameters, loggerPrintHelpers)
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
  if(colored && weGotMarkdown){
    colored = false
  }
  let logBody = ''
  let parametersLength = originalArguments.length
  for (let i = argumentsFrom; i < parametersLength; i++) {
    let argumentName = module.createArgumentName(referenceFunctionArguments, argumentsFrom, i)
    let newMsg = ''
    newMsg += module.createArgumentDelimiter(module.dictionary.beginning, colored, argumentName, calculatedParameters,
                                                                                                     loggerPrintHelpers)
    let value = originalArguments[i]
    let valueToWork = value
    if(isObject(value)){
      valueToWork = flatten(value)
    }
    else{
      valueToWork = value
    }

    let stringifyedParameter = stringifyObject(valueToWork , {
      indent: '  ',
      singleQuotes: false
    })
    newMsg += stringifyedParameter
    newMsg += module.createArgumentDelimiter(module.dictionary.end, colored, argumentName, calculatedParameters,
                                                                                                     loggerPrintHelpers)
    logBody += newMsg
  }

  let theRightWidthOutput = (function (logBody) {
    const cols = process.stdout.columns || 80
    let bodyArray = logBody.split('\n')
    let ret = []
    bodyArray.forEach(function (line, index) {
      let limit = cols -6
      let tooLongLine = line.length >= limit
      if(tooLongLine){
        let re = new RegExp(`.{1,${limit}}`, 'gm')
        let m = line.match(re)
        ret.push(m.join('\n'))
      }
      if(!tooLongLine || !line.length)
      {
        ret.push(line)
      }
    })

    return ret.join('\n')
  }(logBody))

  return theRightWidthOutput
}
