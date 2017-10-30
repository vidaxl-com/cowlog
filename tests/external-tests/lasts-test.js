const cowlog = require('../../src/index')()

cowlog.log('bla-bla-bla', 'bla-bla-bla', 'bla-bla-bla')

cowlog.log('abcz', 'barvalue1')('lasts')
cowlog.log('abcz', 'barvalue2')('lasts')

console.log('yay')
