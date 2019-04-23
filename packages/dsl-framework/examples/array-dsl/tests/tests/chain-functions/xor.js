// [require-a-lot] testIncludes begin
const {
  arrayDsl,
  assert, //node module: assert
  chai, //chai@4.2.0 | http://chaijs.com | BDD/TDD assertion library for node.js and the browser. Test framework agno...
}
// [require-a-lot] testIncludes end
  =
  require('../../requires')
const {expect} = chai

describe('xor tests',()=>{
  it('checks "xor" with no arguments', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).xor(), [1,2,3,4,5])
  })
  it('checks "xor" with arguments', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).xor([1,6])(), [2,3,4,5,6])
  })
  it('checks "xor" with the same data', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).xor([1,6]).xor([1,6]).sort(), [1,2,3,4,5])
  })
})
