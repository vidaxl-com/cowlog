const mockData = require('../mockData')
let runner = require('../lib/test-runner')()
// runner.md.header = 'Logging an array'
// runner.md.javascript = `
// const cowlog = require('@vidaxl/cowlog')()
//
// cowlog.log([${mockData.testArray}])
// `

runner.setTextData({
  header: 'Logging an array',
  javascript: `
const cowlog = require('@vidaxl/cowlog')()
cowlog.log([${mockData.testArray}])
`
})

runner.print(mockData.testArray)
