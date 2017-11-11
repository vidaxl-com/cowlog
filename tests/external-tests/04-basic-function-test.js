const mockData = require('../mockData')
let runner = require('../lib/test-runner')(false, 'clean')
runner.md.header = 'AAA'
runner.print(mockData.abcString, mockData.testInt, mockData.testArray, mockData.threeText, mockData.testFunction)
