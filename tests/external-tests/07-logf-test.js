const mockData = require('../mockData')
require('../lib/test-runner')(true).init(mockData.testFunction, mockData.abcString, mockData.threeText, 11)('die')
