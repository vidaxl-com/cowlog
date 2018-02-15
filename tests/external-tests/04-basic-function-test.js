const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

runner.setTextData({
  msg: [  '### Logging a function',
          `You will see the functions without calling the toString() function. This is 
nothing too extraordinary, but if you don't have to type, you can focus on more 
meaningful stuff.
`,
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
