let runner = require('../lib/test-runner')(false, 'clean')
runner.print('abcz', 'barvalue')('last')
runner.md.header = 'AAA'
console.log('yay')
