require('colors')
const stringifyObject = require('stringify-object')

module.exports = exports = function (container) {
  let calculatedParameters = container['calculated-parameters']
  return {
    getInverseString: function (inverse, string) {
      if (inverse) {
        return string.inverse
      }
      return string
    },

    printMsg: function (iterator, message) {
      let msg = message
      if (calculatedParameters.alternateParameterPrint) {
        let isInverseColor = this._isInversePrint(iterator)
        msg = this._getInverseString(isInverseColor, message)
      }
      return msg
    },

    serialize: function (data) {
      return stringifyObject(data, {
        indent: '  ',
        singleQuotes: false
      })
    }
  }
}