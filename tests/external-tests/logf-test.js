const mockData = require('../mockData')
require('./test-runner')(true)(mockData.testFunction, mockData.abcString, mockData.threeText, 11)('die')
