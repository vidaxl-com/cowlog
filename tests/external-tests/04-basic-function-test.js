const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

runner.setTextData({
  default: {
    msg: ['### Logging a function',
      `You will see the functions without calling the toString() function. It is worthy to mention that the tool automatically shows you the funtions you pass into it.
`,
      {
        text: `
const cowlog = require('cowlog')()
let fuct = ${mockData.testFunction}
cowlog.log(fuct)

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

runner.print(mockData.testFunction)
