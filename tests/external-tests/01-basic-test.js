const mockData = require('../mockData')
const testRunnerParameters = require('../lib/defaultRunnerParameters')
delete testRunnerParameters.plugin
let runner = require('../lib/test-runner')(testRunnerParameters)
runner.md.startString = ''
runner.md.endString = ''

runner.md.header = 'Logging a string'
runner.md.javascript = `
const cowlog = require("@vidaxl/cowlog")()\`;

cowlog.log('${mockData.abcString}, ${mockData.testInt}, ${mockData.testFloat}')\`;
`
runner.print(mockData.abcString, mockData.testInt, mockData.testFloat)
