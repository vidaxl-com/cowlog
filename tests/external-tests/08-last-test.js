const mockData = require('../mockData')
let runner = require('../lib/test-runner')()
runner.setTextData({
  msg: [  '### logging with last curry parameter :) ',
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

runner.dontCloseMdOutput = true
runner.print(mockData.abcString, mockData.threeText)('last')
console.log('yay')
