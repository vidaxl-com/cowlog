const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

runner.md.header = 'Logging a function'
runner.md.javascript = `
const cowlog = require('@vidaxl/cowlog')()
let fuct = ${mockData.testFunction}
cowlog.log(fuct)

`
runner.print(mockData.testFunction)
