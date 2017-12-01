const mockData = require('../mockData')
let runner = require('../lib/test-runner')()
runner.print(mockData.abcString, mockData.testInt, mockData.testArray, mockData.testObject2)
