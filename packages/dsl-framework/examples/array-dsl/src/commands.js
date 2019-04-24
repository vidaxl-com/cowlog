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

module.exports = (result, commandArguments, arrifyOn = false) => {
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
    'last': () => simpleArgumentCall((array) => {
      return !arrifyOn
        ? (() => {
          if (!array.length) return undefined
          return array[array.length - 1]
        })() : arrify(array[array.length - 1])
    }, result),
    'uniqueRandomArray': () => simpleArgumentCall(uniqueRandomArray, result),
    'arrayFindIndex': () => multipleArgumentCall(require('array-find-index'), commandArguments, result),
    // arrify is evaluated for real in the index.js
    'arrify': () => result
  }, { get: (obj, prop) => prop in obj ? obj[prop] : result }
  )
}
