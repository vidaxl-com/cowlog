const cowlog = require('../../dist/index')()

cowlog.log('bla-bla-bla', 'bla-bla-bla', 'bla-bla-bla')

cowlog.log('abcz', 'barvalue')('last')

console.log('yay')
