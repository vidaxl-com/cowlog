const mockData = require('../mockData')
let runner = require('../lib/test-runner')()
runner.print(mockData.abcString, 'barvalue2')('die')

console.log('yay')
