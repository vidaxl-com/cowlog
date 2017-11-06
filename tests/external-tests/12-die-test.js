const mockData = require('../mockData')
require('../lib/test-runner')()(mockData.abcString, 'barvalue2')('die')

console.log('yay')
