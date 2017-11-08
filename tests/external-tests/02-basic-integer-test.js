const mockData = require('../mockData')
let runner = require('../lib/test-runner')()
runner.md.header = 'AAA'
runner.md.header = 'Logging an Integer'
runner.md.javascript = `
const cowlog = require("@vidaxl/cowlog")()\`;

cowlog.log('${mockData.testInt})\`;
`
runner.print(mockData.testInt)
