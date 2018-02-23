const _ = require('lodash')
const sstlm = require('./substing-to-line-mapper')

module.exports = exports = function (string, beginning, closing, newValue = null) {
  let templateBeginningArray = sstlm(string, beginning).reverse()
  let templateEndArray = sstlm(string, closing).reverse()


  if (templateBeginningArray.length !== templateEndArray.length) {
    throw String(`The number linker closing tags and starting tags are not matching`)
  }
  let resultAltered = false
  let stringArray = string.split('\n')
  _.each(templateBeginningArray, function (templateBeginning, index) {
    let templateEnd = templateEndArray[index]

    if (templateBeginning >= 0 && templateEnd && templateBeginning < templateEnd) {
      if (newValue) {
        stringArray = stringArray.slice(0, templateBeginning + 1)
          .concat(newValue.split('\n')
            .concat(stringArray.slice(templateEnd, stringArray.length)))
      }
      if (!newValue && !resultAltered) {
        stringArray = stringArray.slice(templateBeginning + 1, templateEnd)
        resultAltered = true
      }
    }
  })

  return stringArray.join('\n')
}
