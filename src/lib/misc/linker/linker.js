const arrayify = require('array-ify');
const _ = require('lodash')
const sstlm = require('./substing-to-line-mapper')

module.exports = exports = function (string, beginning, closing, newValue) {
  let templateBeginningArray = arrayify(sstlm(string, beginning)).reverse()
  let templateEndArray = arrayify(sstlm(string, closing)).reverse()
  if (templateBeginningArray.length !== templateEndArray.length){
    throw String('The number linker closing tags and starting tags are not matching')
  }
  let stringArray = string.split('\n')
  _.each(templateBeginningArray, function (templateBeginning, index) {
    let templateEnd = templateEndArray[index]
    if (templateBeginning >= 0 && templateEnd && templateBeginning < templateEnd && newValue) {
      let resultArray = stringArray.slice(0, templateBeginning + 1)
        .concat(newValue.split('\n').concat(stringArray.slice(templateEnd, stringArray.length)))

      stringArray = resultArray
    }
  })

  return stringArray.join('\n')
}