require('colors')
const stringifyObject = require('stringify-object')

module.exports = exports = function (container) {
  return {
    getInverseString: function (inverse, string) {
      /* istanbul ignore else */
      if (inverse) {
        return string.inverse + ''
      }
      return string
    },
    serialize: function (data) {
      return stringifyObject(data, {
        indent: '  ',
        singleQuotes: false
      })
    }
  }
}
