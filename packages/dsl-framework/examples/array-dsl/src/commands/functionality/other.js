const simpleArgumentCall = require('./lib/simple-argument-call')
const multipleArgumentCall = require('./lib/multiple-argument-call')
const uniqueRandomArray = require('unique-random-array')

module.exports = (result, commandArguments, arrifyOn) => ({
  'uniqueRandomArray': () => simpleArgumentCall(uniqueRandomArray, result),
  'arrayFindIndex': () => multipleArgumentCall(require('array-find-index'), commandArguments, result),
  'arrify': () => result
})
