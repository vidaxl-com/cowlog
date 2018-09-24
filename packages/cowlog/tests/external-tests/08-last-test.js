const mockData = require('../mockData')
require('../../src/index')('clean')

l(mockData.abcString, mockData.threeText).last()
console.log('yay')
