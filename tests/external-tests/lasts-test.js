const cowlog = require('./cowlog-provider')()

cowlog.log('bla-bla-bla', 'bla-bla-bla', 'bla-bla-bla')

cowlog.log('abcz', 'barvalue1')('lasts')
cowlog.log('abcz', 'barvalue2')('lasts')

console.log('yay')
