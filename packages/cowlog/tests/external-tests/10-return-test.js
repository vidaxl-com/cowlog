const mockData = require('../mockData')
let runner = require('../lib/test-runner')()

runner.setTextData({
  default: {
    msg: [

      `### return curry parameter`,
      `With this the cowlog returns the last parameter you displayed with it.`,
      {
        text: `
const cowlog = require('cowlog')()
cowlog.log('bla-bla-bla', 'bla-bla-bla', 'bla-bla-bla')
cowlog.log('abcz', 'barvalue1', 1)('lasts')
cowlog.log('abcz', 'barvalue2', 2)('lasts')
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
})

let c = async function() {
  return await runner.print(mockData.testFunction,
    mockData.abcString + 'd',
    mockData.threeText,
    mockData.abcString)('return')().then(d => d)
}

c().then((ret)=>{
  console.log(ret)
  console.log(ret + 'z')
}, ()=>{})
