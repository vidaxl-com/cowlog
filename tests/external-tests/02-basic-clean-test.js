const mockData = require('../mockData')
let runner = require('../lib/test-runner')()
// runner.md.header = 'Logging a string'
// runner.md.javascript = `
// const cowlog = require('@vidaxl/cowlog')('clean')
// cowlog.log('${mockData.abcString}')

runner.setTextData({
  msg: [  '### logging with the "clean" plugin',

    {
      text: `
const cowlog = require('@vidaxl/cowlog')('clean')
cowlog.log('${mockData.abcString}')
`,
      before: '```javascript',
      after: '```'
    },
    {
      consoleOutput: true
    }

  ]
})

runner.print(mockData.abcString)
