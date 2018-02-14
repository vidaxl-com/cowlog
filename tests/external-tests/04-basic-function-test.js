const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

runner.setTextData({
  msg: [  '### Logging a function',
          `You will see the functions without calling the toSting() function 
nothing extraordinary, but if you dont't have to type you can focus on more 
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
