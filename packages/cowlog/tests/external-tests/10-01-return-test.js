const mockData = require('../mockData')
require('../../src/index')('clean')

let c = async function() {
  return await l(mockData.testFunction,
    mockData.abcString + 'd',
    mockData.threeText,
    mockData.abcString)('return')().then(d => d)
}

c().then((ret)=>{
  console.log(ret)
  console.log(ret + 'z')
}, ()=>{})

console.log('lastly')
