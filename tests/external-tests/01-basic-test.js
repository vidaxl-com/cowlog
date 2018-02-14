const mockData = require('../mockData')
const testRunnerParameters = require('../lib/defaultRunnerParameters')
delete testRunnerParameters.plugin
let runner = require('../lib/test-runner')(testRunnerParameters)

runner.setTextData({
  msg: [  `## That's the way you like it`,
          `You will see all information with cowlog, no need to have specially
trained eye for development log messages, or special identifiable 
strings, before and after you want to see. You can find what you 
wanted to inspect, if it is too much, or want to preseve it, just put
the path of the file "session log" and you will get all log messages
while the program was running, for later inspection.

"called from" is the exact place where you placed cowlog, so you can 
remove it with ease, after you was inspecting the variables in the 
runtime.

The "stack trace" will help you, it sticks with cowlog.
           `,
          '### Default logging',

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
