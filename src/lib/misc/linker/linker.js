const sstlm = require('./substing-to-line-mapper')
const clone = require('clone')

module.exports = exports = function (data, beginning, closing, newValue = null) {
  let templateBeginningArray = sstlm(data, beginning).reverse()
  let templateEndArray = sstlm(data, closing).reverse()

  if (templateBeginningArray.length !== templateEndArray.length) {
    throw String(`The number linker closing tags and starting tags are not matching`)
  }
  let returnData = clone(data.split('\n'))
  if (newValue) {
    templateBeginningArray.forEach(function (templateBeginning, index) {
      let templateEnd = templateEndArray[index]
      if (templateBeginning >= 0 && templateEnd && templateBeginning < templateEnd) {
        if (newValue) {
          returnData = returnData.slice(0, templateBeginning + 1)
            .concat(newValue.split('\n')
              .concat(returnData.slice(templateEnd, returnData.length)))
        }
      }
    })

    return module.makeReturnObject(returnData, true)
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
    return module.makeReturnObject(returnData, resultAltered)
    if (!resultAltered) {
      return module.makeReturnObject(['\n'], resultAltered)
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
