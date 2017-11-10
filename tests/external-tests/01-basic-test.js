const mockData = require('../mockData')
let runner = require('../lib/test-runner')(false, 'default')
runner.md.header = 'Logging a string'
runner.md.javascript = `
const cowlog = require("@vidaxl/cowlog")()\`;

cowlog.log('${mockData.abcString}, ${mockData.testInt}, ${mockData.testFloat}')\`;
`
runner.print(mockData.abcString, mockData.testInt, mockData.testFloat)
