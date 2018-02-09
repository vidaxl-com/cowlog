const mockData = require('../mockData')
const testRunnerParameters = require('../lib/defaultRunnerParameters')
delete testRunnerParameters.plugin
let runner = require('../lib/test-runner')(testRunnerParameters)

runner.setTextData({
  msg: [  '### Default logging',

          {
            text: `
const cowlog = require('@vidaxl/cowlog')()
cowlog.log('${mockData.abcString}, ${mockData.testInt}, ${mockData.testFloat}');
`,
            before: '```javascript',
            after: '```'
          },
          {
            consoleOutput: true
          }
      ]

})

runner.print(mockData.abcString, mockData.testInt, mockData.testFloat)
