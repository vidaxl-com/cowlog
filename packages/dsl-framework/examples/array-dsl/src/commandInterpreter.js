const arrayFlatten = require('array-flatten')
const arrayUniq = require('array-uniq')
const arrayXor = require('array-xor')
const simpleArgumentCall = (fn, array) => fn(array)
const multipleArgumentCall = (fn, commandArguments, array) => fn(array, ...commandArguments)
const randomItem = require('random-item')
const uniqueRandomArray = require('unique-random-array')
const arrayUnion = require('array-union')

module.exports = (command, commandArguments, result) => {
  if (command === 'flatten') {
    return simpleArgumentCall(arrayFlatten, result)
  }
  if (command === 'unique') {
    return simpleArgumentCall(arrayUniq, result)
  }
  if (command === 'sort') {
    return result.sort()
  }
  if (command === 'reverse') {
    return result.reverse()
  }
  if (command === 'xor') {
    return arrayXor(result, ...commandArguments)
  }
  if (command === 'union') {
    return arrayUnion(result, ...commandArguments)
  }

  if (command === 'slice') {
    return result.slice(...commandArguments)
  }
  if (command === 'randomItem') {
    return simpleArgumentCall(randomItem, result)
  }
  if (command === 'first') {
    return simpleArgumentCall((array) => {
      if (!array.length) return undefined
      return array[0]
    }, result)
  }
  if (command === 'last') {
    return simpleArgumentCall((array) => {
      if (!array.length) return undefined
      return array[array.length - 1]
    }, result)
  }
  if (command === 'uniqueRandomArray') {
    return simpleArgumentCall(uniqueRandomArray, result)
  }
  if (command === 'arrayFindIndex') {
    return multipleArgumentCall(require('array-find-index'), commandArguments, result)
  }
}
