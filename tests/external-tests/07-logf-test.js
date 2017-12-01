const mockData = require('../mockData')
let runner = require('../lib/test-runner')({logf: true})
runner.print(mockData.testFunction, mockData.abcString, mockData.threeText, 11)
