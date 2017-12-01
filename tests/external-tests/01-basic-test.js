const mockData = require('../mockData')
const testRunnerParameters = require('../lib/defaultRunnerParameters')
delete testRunnerParameters.plugin
let runner = require('../lib/test-runner')(testRunnerParameters)

runner.setTextData({
  header: 'Default logging',
  javascript: `
const cowlog = require('@vidaxl/cowlog')()
cowlog.log('${mockData.abcString}, ${mockData.testInt}, ${mockData.testFloat}');
`
})

runner.print(mockData.abcString, mockData.testInt, mockData.testFloat)
