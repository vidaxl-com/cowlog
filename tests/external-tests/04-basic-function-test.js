const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

// runner.md.header = 'Logging a function'
// runner.md.javascript = `
// const cowlog = require('@vidaxl/cowlog')()
// let fuct = ${mockData.testFunction}
// cowlog.log(fuct)
//
// `
runner.setTextData({
  header: 'Logging a function',
  javascript: `
const cowlog = require('@vidaxl/cowlog')()
let fuct = ${mockData.testFunction}
cowlog.logf(fuct)

`
})

runner.print(mockData.testFunction)
