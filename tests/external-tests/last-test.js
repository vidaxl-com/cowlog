const cowlog = require('./cowlog-provider')()

cowlog.log('bla-bla-bla', 'bla-bla-bla', 'bla-bla-bla')

cowlog.log('abcz', 'barvalue')('last')

console.log('yay')
