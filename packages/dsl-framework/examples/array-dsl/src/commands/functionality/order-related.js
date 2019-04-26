const arrify = require('arrify/index')
const simpleArgumentCall = require('./lib/simple-argument-call')

const ge = (arrifyOn, result, transformer) => () => simpleArgumentCall((array) => {
  return !arrifyOn
    ? (() => {
      if (!array.length) return undefined
      return array[array.length - 1]
    })() : transformer(array[array.length - 1])
}, result)

module.exports = (result, commandArguments, arrifyOn) => ({
  'first': () => simpleArgumentCall((array) => {
    if (!array.length) return undefined
    return array[0]
  }, result),
  'head': function () {
    return this.first()
  },
  'tail': () => simpleArgumentCall((array) => {
    if (!array.length) return undefined
    return array.slice(1)
  }, result),
  'last': ge(arrifyOn, result, arrify),
})
