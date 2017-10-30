const cowlog = require('../../src/index')()

cowlog.log('bla-bla-bla', 'bla-bla-bla', 'bla-bla-bla')

cowlog.log('abc', 'barvalue1')('lasts')
cowlog.log('abc', 'barvalue2')('lasts')

console.log('yay')
