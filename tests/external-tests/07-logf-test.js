const mockData = require('../mockData')
let runner = require('../lib/test-runner')({logf: true})
runner.md.header = 'AAA'
runner.print(mockData.testFunction, mockData.abcString, mockData.threeText, 11)
