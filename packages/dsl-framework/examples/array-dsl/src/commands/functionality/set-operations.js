const simpleArgumentCall = require('./lib/simple-argument-call')

const arrayFlatten = require('array-flatten/array-flatten')
const arrayUniq = require('array-uniq/index')
const arrayXor = require('arr-xor')
const randomItem = require('random-item/index')
const arrayUnion = require('array-union/index')
const arrDiff = require('arr-diff')

module.exports = (result, commandArguments, arrifyOn) => ({
  'xor': () => arrayXor(result, ...commandArguments),
  'diff': () => arrDiff(result, ...commandArguments),
  'union': () => arrayUnion(result, ...commandArguments),
  'unique': () => simpleArgumentCall(arrayUniq, result),
  'flatten': () => simpleArgumentCall(arrayFlatten, result),
  'randomItem': () => simpleArgumentCall(randomItem, result),
})
