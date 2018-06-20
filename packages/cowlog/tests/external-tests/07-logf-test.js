const mockData = require('../mockData')
require('../../src/index')('clean')

l(mockData.testFunction, mockData.abcString, mockData.threeText)()
