const mockData = require('../mockData')
const cowlog = require('./cowlog-provider')()

cowlog.logf(mockData.testFunction, mockData.abcString, mockData.threeText, 11)
