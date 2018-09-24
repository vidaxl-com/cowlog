const mockData = require('../mockData')
require('../../src/index')('clean')


const ret = l(mockData.testFunction,
  mockData.abcString + 'd',
  mockData.threeText,
  mockData.abcString).return()

console.log(ret)
console.log(ret + 'z')
