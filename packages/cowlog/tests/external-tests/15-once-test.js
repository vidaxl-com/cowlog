const mockData = require('../mockData')
let runner = require('../lib/test-runner')()
runner.setTextData({
  default: {
    msg: [

      `### Using  "die" curry parameter`,
      `Use "die" curry parameter if you want to end your software just here, 
      after it comes, will not be executed.     
    `,
      {
        text: `
const cowlog = require('cowlog')()
cowlog.log('${mockData.abcString}', 'barvalue2')('die')

console.log('yay')
`,
        before: '```javascript',
        after: '```'
      },
      {
        consoleOutput: true
      }
    ]
  }
});


[111, 2222, 3333, 4444, 'cool'].forEach(async n=>{
  console.log(await runner.print('a','b','cc', n)('once')('return')()
    .then(d=>d), "AAAA")
})
