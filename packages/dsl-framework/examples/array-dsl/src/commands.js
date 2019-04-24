const simpleArgumentCall = (fn, array) => fn(array)
const multipleArgumentCall = (fn, commandArguments, array) => fn(array, ...commandArguments)

const arrayFlatten = require('array-flatten')
const arrayUniq = require('array-uniq')
const arrayXor = require('arr-xor')
const randomItem = require('random-item')
const uniqueRandomArray = require('unique-random-array')
const arrayUnion = require('array-union')
const arrDiff = require('arr-diff')
const arrify = require('arrify')
const d3 = require('d3-array')

const ge = (arrifyOn, result, transformer) => () => simpleArgumentCall((array) => {
  return !arrifyOn
    ? (() => {
      if (!array.length) return undefined
      return array[array.length - 1]
    })() : transformer(array[array.length - 1])
}, result)

const geTag = (arrifyOn, result, transformer) => (tag) => (tagArgument) => () =>
  !tagArgument
    ? transformer[tag](result)
    : transformer[tag](result, tagArgument)

module.exports = (result, commandArguments, arrifyOn = false) => {
  const d3Handler = geTag(arrifyOn, result, d3)
  // if(arrifyOn) l(arrifyOn).die()

  // l(arrifyOn)()
  return new Proxy({
    'flatten': () => simpleArgumentCall(arrayFlatten, result),
    'unique': () => simpleArgumentCall(arrayUniq, result),
    'sort': () => result.sort(),
    'reverse': () => result.reverse(),
    'xor': () => arrayXor(result, ...commandArguments),
    'diff': () => arrDiff(result, ...commandArguments),
    'union': () => arrayUnion(result, ...commandArguments),
    'slice': () => result.slice(...commandArguments),
    'randomItem': () => simpleArgumentCall(randomItem, result),
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
    // statistics begin
    'min': d3Handler('min')(),
    'max': d3Handler('max')(),
    'extent': d3Handler('extent')(),
    'sum': d3Handler('sum')(),
    'median': d3Handler('median')(),
    'quantile': d3Handler('quantile')(commandArguments),
    'variance': d3Handler('variance')(),
    'deviation': d3Handler('deviation')(),
    // statistics end
    // search begin
    // search end
    'uniqueRandomArray': () => simpleArgumentCall(uniqueRandomArray, result),
    'arrayFindIndex': () => multipleArgumentCall(require('array-find-index'), commandArguments, result),
    // arrify is evaluated for real in the index.js
    'arrify': () => result
  }, { get: (obj, prop) => prop in obj ? obj[prop] : result }
  )
}
