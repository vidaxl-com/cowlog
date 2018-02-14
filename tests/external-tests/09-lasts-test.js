const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

runner.setTextData({
  msg: [
    '## Curry parameters logging',
    `We aimed to make the logging as easy as possible therefore we only exposed
the log and logf functions, tough you have many options to extpand your logging
experience, just call it again as it was a function, see it in the example below.`,
    '### logging with "last" ',
    `We want to see sometimes a specific log entry, but possibly without too much 
work, you don't want to serach, and scroll the console, for a specific log entry
when your software end's it's execution this makes sure just before exiting
you will see the log entry created with the last curry parameter. I have chosen
this because it is easy to alter your existing cowlog.log codes. 
Of course it works with logf as well.`,
    {
      text: `
const cowlog = require('@vidaxl/cowlog')()
cowlog.log(${mockData.abcString}, ${mockData.threeText})('last')
`,
      before: '```javascript',
      after: '```'
    },
    {
      consoleOutput: true
    }
  ]
})

runner.print('bla-bla-bla', 'bla-bla-bla', 'bla-bla-bla')

l('abcz', 'barvalue1', 1)('lasts')
l('abcz', 'barvalue2', 2)('lasts')

console.log('yay')
