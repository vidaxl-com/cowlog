const mockData = require('../mockData')
const cowlog = require('../../dist/index')()

cowlog.logf(mockData.testFunction, mockData.abcString, mockData.threeText, 11)
