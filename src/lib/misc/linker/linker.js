const sstlm = require('./substing-to-line-mapper')
require('../../../index')()
module.exports = exports = function (inputString, beginning, closing,
                                                              newValue = null) {
  let templateBeginningArray = sstlm(inputString, beginning).reverse()
  let templateEndArray = sstlm(inputString, closing).reverse()

  if (templateBeginningArray.length !== templateEndArray.length) {
    throw String(`The number linker closing tags and starting tags are not matching`)
  }
  let stringArray = inputString.split('\n')

  if (newValue) {
    templateBeginningArray.forEach(function (templateBeginning, index) {
      let templateEnd = templateEndArray[index]
      if (templateBeginning >= 0 && templateEnd && templateBeginning < templateEnd) {
        stringArray = stringArray.slice(0, templateBeginning + 1)
          .concat(newValue.split('\n')
            .concat(stringArray.slice(templateEnd, stringArray.length)))
      }
    })
  }
  let changed = inputString != stringArray.join('\n')


  if (!newValue) {
    let gotOne = false
    templateBeginningArray.forEach(function (templateBeginning, index) {
      if(!gotOne){
        let templateEnd = templateEndArray[index]
        stringArray = stringArray.slice(templateBeginning + 1, templateEnd)
        gotOne = true
      }
    })
  }

  let piece = !newValue
  // if(piece) l(piece, stringArray, inputString, "DDDDD")
  return {
    content: stringArray.join('\n'),
    changed,
    piece
  }
}
