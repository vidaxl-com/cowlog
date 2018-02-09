const mockData = require('../mockData')
let runner = require('../lib/test-runner')()
// runner.md.header = 'Logging an array'
// runner.md.javascript = `
// const cowlog = require('@vidaxl/cowlog')()
//
// cowlog.log([${mockData.testArray}])
// `

runner.setTextData({
  msg: [  '### Logging an array',

    {
      text: `
const cowlog = require('@vidaxl/cowlog')()
cowlog.log([${mockData.testArray}])
`,
      before: '```javascript',
      after: '```'
    },
    {
      consoleOutput: true
    }
  ]
})

runner.print(mockData.testArray)
