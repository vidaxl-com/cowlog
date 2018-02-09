const mockData = require('../mockData')
let runner = require('../lib/test-runner')({logf: true})

runner.setTextData({
  msg: [  '### usig cowlog.logf',
    `The logf function of the cowlog object similar top the logf
The only difference that it does not numbers the output's arguments, but shows
the name of the parameter it belongs to
    `,
    {
      text: `
const cowlog = require('@vidaxl/cowlog')()
let fuct = ${mockData.testFunction}
cowlog.logf(fuct, ${mockData.abcString}, ${mockData.threeText})
`,
      before: '```javascript',
      after: '```'
    },
    {
      consoleOutput: true
    }
  ]
})

runner.print(mockData.testFunction, mockData.abcString, mockData.threeText)
