require('colors')
const stringifyObject = require('stringify-object')

module.exports = exports = function (container) {
  return {
    serialize: function (data) {
      return stringifyObject(data, {
        indent: '  ',
        singleQuotes: false
      })
    }
  }
}
