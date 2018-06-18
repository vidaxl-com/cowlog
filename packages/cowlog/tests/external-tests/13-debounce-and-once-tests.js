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

['aaaa', 'bbbb', 'cccc', 'ffff', 'ggggg', 'hhhhh', 'iiii', 'jjjjjj', 'DE']
  .forEach(letters=>l('abcz', letters)('debounce', 2000)('once')())

