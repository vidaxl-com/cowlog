const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

runner.setTextData({
  default: {
    msg: [

      `### lasts at last`,
      `Lasts curry parameter gives you the same information that last does, but it
will display more log entries after your application exited and you called more 
cowlog.log with lasts currying. If you log with "last" after "lasts" this will 
overwrite "lasts" displaying at the end, but if you call "lasts" before you 
registered "last" logging, it will show all of them at the end.
    
    `,
      {
        text: `
const cowlog = require('cowlog')()
cowlog.log('bla-bla-bla', 'bla-bla-bla', 'bla-bla-bla')
cowlog.log('abcz', 'barvalue1', 1)('lasts')
cowlog.log('abcz', 'barvalue2', 2)('lasts')
console.log('yay')
`,
        before: '```javascript',
        after: '```'
      },
      {
        consoleOutput: true
      }
    ]
  }
})

runner.print('bla-bla-bla', 'bla-bla-bla', 'bla-bla-bla')

l('abcz', 'barvalue1', 1)('lasts')
l('abcz', 'barvalue2', 2)('lasts')

console.log('yay')
