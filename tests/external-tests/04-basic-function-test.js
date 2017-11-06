const mockData = require('../mockData')
require('../lib/test-runner')()(mockData.abcString, mockData.testInt, mockData.testArray, mockData.threeText, mockData.testFunction)
