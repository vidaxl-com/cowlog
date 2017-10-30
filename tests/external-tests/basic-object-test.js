const mockData = require('../mockData')
const cowlog = require('../../src/index')()

cowlog.log(mockData.abcString, mockData.testInt, mockData.testArray, mockData.testObject1)
