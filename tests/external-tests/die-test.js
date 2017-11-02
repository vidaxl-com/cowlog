const mockData = require('../mockData')
const cowlog = require('../../dist/index')()

cowlog.log(mockData.abcString, 'barvalue2')('die')

console.log('yay')
