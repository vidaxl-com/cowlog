const mockData = require('../mockData')
require('../../src/index')('clean')

l(mockData.abcString, mockData.testInt, mockData.testArray, mockData.testObject2)()
