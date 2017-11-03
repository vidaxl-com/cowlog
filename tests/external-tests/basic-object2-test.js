const mockData = require('../mockData')
const cowlog = require('./cowlog-provider')()

cowlog.log(mockData.abcString, mockData.testInt, mockData.testArray, mockData.testObject2)
