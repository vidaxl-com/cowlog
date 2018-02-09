const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

// runner.md.header = 'Logging a function'
// runner.md.javascript = `
// const cowlog = require('@vidaxl/cowlog')()
// let fuct = ${mockData.testFunction}
// cowlog.log(fuct)
//
// `
runner.setTextData({
  msg: [  '### Logging a function',

    {
      text: `
const cowlog = require('@vidaxl/cowlog')()
let fuct = ${mockData.testFunction}
cowlog.logf(fuct)

`,
      before: '```javascript',
      after: '```'
    },
    {
      consoleOutput: true
    }
  ]
})

runner.print(mockData.testFunction)
