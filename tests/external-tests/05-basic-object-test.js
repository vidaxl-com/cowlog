const mockData = require('../mockData')
let runner = require('../lib/test-runner')()
runner.md.header = 'AAA'
runner.print(mockData.abcString, mockData.testInt, mockData.testArray, mockData.testObject1)
