const mockData = require('../mockData')
const cowlog = require('./cowlog-provider')()

let returnValue = cowlog.log(mockData.testFunction, mockData.abcString, mockData.threeText, mockData.abcString)('return')

console.log(returnValue + 'z')