const mockData = require('../mockData')
const cowlog = require('../../dist/index')()

cowlog.log(mockData.abcString, mockData.testInt, mockData.threeText, mockData.testArray)
