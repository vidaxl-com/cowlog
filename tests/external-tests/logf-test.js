const mockData = require('../mockData')
const cowlog = require('../../src/index')()

cowlog.logf(mockData.testFunction, mockData.abcString, mockData.threeText, 11)
