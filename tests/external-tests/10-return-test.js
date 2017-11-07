const mockData = require('../mockData')
let returnValue = require('../lib/test-runner')().init(mockData.testFunction, mockData.abcString, mockData.threeText, mockData.abcString)('return')

console.log(returnValue + 'z')
