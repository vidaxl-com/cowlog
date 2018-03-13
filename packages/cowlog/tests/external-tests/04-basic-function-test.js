const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

runner.setTextData({
  default: {
    msg: ['### Logging a function',
      `You will see the functions without calling the toString() function. This is 
nothing too extraordinary, but if you don't have to type, you can focus on more 
important stuff.
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
