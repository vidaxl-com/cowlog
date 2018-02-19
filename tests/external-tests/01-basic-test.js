const mockData = require('../mockData')
const testRunnerParameters = require('../lib/defaultRunnerParameters')
delete testRunnerParameters.plugin
let runner = require('../lib/test-runner')(testRunnerParameters)

runner.setTextData({
  msg: [  `### That's the way you like it`,
          `You will see all information with cowlog, no need to have specially
trained eye for development log messages, or special identifiable 
strings, before and after you want to see. 

- **session log**: Every time cowlog is called, the result is logged in a separate file. That way, all the logs
can be found through the path displayed and get inspected even when the code is running in real time.

- **called from**: It is the exact place where you placed cowlog, so you can 
remove it with ease, after you have inspected the variables in the 
runtime.

The "stack trace" will help you, it sticks with cowlog.
           `,
          '### Default logging',

          {
            text: `
const cowlog = require('cowlog')()
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
