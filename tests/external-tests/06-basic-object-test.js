const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

runner.setTextData({
  msg: [  '### Logging an object',

    {
      text: `
const cowlog = require('@vidaxl/cowlog')()
let fuct = ${mockData.testFunction}
cowlog.logf(${mockData.abcString}, ${mockData.testInt}, ${mockData.testArray}, ${mockData.testObject2})
`,
      before: '```javascript',
      after: '```'
    },
    {
      consoleOutput: true
    }
  ]
})

runner.print(mockData.abcString, mockData.testInt, mockData.testArray,
                                                           mockData.testObject2)
