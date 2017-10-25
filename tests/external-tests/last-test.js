const cowlog = require('../../index')()

cowlog.log('bla-bla-bla', 'bla-bla-bla', 'bla-bla-bla')

cowlog.log('abc', 'barvalue')('last')

console.log('yay')
