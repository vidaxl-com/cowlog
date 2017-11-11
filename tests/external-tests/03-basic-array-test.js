const mockData = require('../mockData')
let runner = require('../lib/test-runner')()
runner.md.header = 'Logging n array'
runner.md.javascript = `
const cowlog = require("@vidaxl/cowlog")()\`;

cowlog.log([${mockData.testArray}])\`;
`
runner.print(mockData.testArray)
