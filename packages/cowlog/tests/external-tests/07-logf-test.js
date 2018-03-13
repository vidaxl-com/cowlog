const mockData = require('../mockData')
let runner = require('../lib/test-runner')({logf: true})

runner.setTextData({
  default: {
    msg: ['### usig cowlog.logf',
      `The logf function of the cowlog object is similar to the logf.
The only difference is that it does not number the output's arguments, but shows
the name of the parameter it belongs to. See the example below.
    `,
      {
        text: `
const cowlog = require('cowlog')()
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
  }
})

runner.print(mockData.testFunction, mockData.abcString, mockData.threeText)
