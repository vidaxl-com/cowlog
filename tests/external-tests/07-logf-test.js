const mockData = require('../mockData')
let runner = require('../lib/test-runner')(true)
runner.print(mockData.testFunction, mockData.abcString, mockData.threeText, 11)
