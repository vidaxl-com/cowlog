const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

runner.setTextData({
  default: {
    msg: ['### Logging an object',
      `Objects are shown in full depth.`,

      {
        text: `
const cowlog = require('cowlog')()
let fuct = ${mockData.testFunction}
cowlog.log(${mockData.abcString}, ${mockData.testInt}, ${mockData.testArray}, ${mockData.testObject2})
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

runner.print(mockData.abcString, mockData.testInt, mockData.testArray,
                                                           mockData.testObject2)
