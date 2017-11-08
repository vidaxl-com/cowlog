let runner = require('../lib/test-runner')()
runner.md.header = 'AAA'
runner.print('bla-bla-bla', 'bla-bla-bla', 'bla-bla-bla')

l('abcz', 'barvalue1', 1)('lasts')
l('abcz', 'barvalue2', 2)('lasts')

console.log('yay')
