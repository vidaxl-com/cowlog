const mockData = require('../mockData')
let runner = require('../lib/test-runner')()
runner.setTextData({
  default: {
    msg: [
      '## Altering your logs with curry parameters',
      `We aimed to make the logging as easy as possible therefore we only exposed
the log and logf functions, though you have many options to expand your logging
experience. Just call it again as it was a function, as in the example below.`,
      '### logging with "last" ',
      `We want to see sometimes a specific log entry, but possibly without too much 
work. Maybe you don't want to search and scroll the console for a particular log entry
when your software ends its execution. This configuration makes sure, just before exiting,
you will see the log entry created with the last curry parameter. I have chosen
this because it is easy to alter your existing cowlog.log codes. 
Of course, all curry magic works with logf as well.`,
      {
        text: `
const cowlog = require('cowlog')()
cowlog.log(${mockData.abcString}, ${mockData.threeText})('last')
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

runner.dontCloseMdOutput = true
runner.print(mockData.abcString, mockData.threeText)('last')
console.log('yay')
