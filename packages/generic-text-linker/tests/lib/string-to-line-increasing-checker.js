const sstlm = require('../../src/substing-to-line-mapper')
const assert = require('chai').assert

module.exports = function (input, stringArray) {
  let previous = null
  let previousValue = null
  stringArray.forEach(function (value, index) {
    let actual = sstlm(input, value)
    if (index) {
      if (typeof previous === 'number' && typeof actual === 'number') {
        assert(previous < actual, '"' + previousValue + '" is not sooner than "' + value + '" in string: \n' + input)
      }
    }
    previous = actual
    previousValue = value
  })
}
