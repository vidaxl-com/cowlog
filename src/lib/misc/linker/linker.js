const sstlm = require('./substing-to-line-mapper')
const clone = require('clone')

module.exports = exports = function (inputString, beginning, closing, newValue = null) {
  let templateBeginningArray = sstlm(inputString, beginning).reverse()
  let templateEndArray = sstlm(inputString, closing).reverse()
  // let changed = false
  let changed = {
    all: false,
    withoutWhiteSpaces: false,
    status: 'read'
  }

  if (templateBeginningArray.length !== templateEndArray.length) {
    throw String(`The number linker closing tags and starting tags are not matching`)
  }
  let returnData = clone(inputString.split('\n'))
  if (newValue) {
    templateBeginningArray.forEach(function (templateBeginning, index) {
      let templateEnd = templateEndArray[index]
      if (templateBeginning >= 0 && templateEnd && templateBeginning < templateEnd) {
        if (newValue) {
          returnData = returnData.slice(0, templateBeginning + 1)
            .concat(newValue.split('\n')
              .concat(returnData.slice(templateEnd, returnData.length)))
          changed.all = true
          changed.status = 'write'
        }
      }
    })

    if(
      module.clearWhitespace(returnData.join('\n')) !== module.clearWhitespace(inputString)
    ){
      changed.withoutWhiteSpaces = true
    }
    return module.makeReturnObject(returnData, changed)
  }

  if (!newValue) {
    let resultAltered = false
    templateBeginningArray.forEach(function (templateBeginning, index) {
      let templateEnd = templateEndArray[index]
      if (!resultAltered) {
        returnData = returnData.slice(templateBeginning + 1, templateEnd)
        resultAltered = true
      }
    })

    // return returnData.join('\n')
    return module.makeReturnObject(returnData, changed)
    if (!resultAltered) {
      return module.makeReturnObject(['\n'], changed)
    }
  }

  return returnData.join('\n')
}

module.backToSting = function(array) {
  return array.join('\n')
}

module.makeReturnObject = function(returnData, changed) {
  returnData = returnData.join('\n')
  return{returnData, changed}
}

module.clearWhitespace = function(stringWithWhiteSpaces) {
  return stringWithWhiteSpaces.toString().replace(/\s/g, "")
}
