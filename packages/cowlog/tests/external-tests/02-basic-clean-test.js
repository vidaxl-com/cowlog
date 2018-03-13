const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

runner.setTextData({
  default: {
    msg: ['## Plugin system, configuration management',
        `Cowlog provides a lot of information, so you can always see 
where you were logging from, but you can turn the details off by initializing 
cowlog with the "clean" configuration. The details at the bottom are just a 
product of a plugin that you can disable with ease. For the rest of the 
examples let's turn them off, so we will have to scroll a bit less.
    `,

      '### logging with the "clean" configuration',
        `Only use it if you have a good reason like I have at the moment because of you 
will lose many interesting details and it is all about the details.`,

      {
        text: `
const cowlog = require('cowlog')('clean')
cowlog.log('${mockData.abcString}')
`,
        before: '```javascript',
        after: '```'
      },
      {
        consoleOutput: true
      }

    ]
  }
})

runner.print(mockData.abcString)
