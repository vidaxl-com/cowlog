const mockData = require('../mockData')
let runner = require('../lib/test-runner')(true)
runner.md.header = 'AAA'
runner.print(mockData.testFunction, mockData.abcString, mockData.threeText, 11)
