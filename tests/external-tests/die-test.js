const mockData = require('../mockData')
const cowlog = require('./cowlog-provider')()

cowlog.log(mockData.abcString, 'barvalue2')('die')

console.log('yay')
