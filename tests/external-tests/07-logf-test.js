const mockData = require('../mockData')
require('../lib/test-runner')(true)(mockData.testFunction, mockData.abcString, mockData.threeText, 11)('die')
