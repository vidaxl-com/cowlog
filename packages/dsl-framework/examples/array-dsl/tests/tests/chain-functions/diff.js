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

describe('diff tests',()=>{
  it('checks "diff" with no arguments', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).diff(), [1,2,3,4,5])
  })
  it('checks "diff" with arguments', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).diff([1,6])(), [2,3,4,5])
    assert.deepEqual(arrayDsl([1,6]).diff([1,2,3,4,5])(), [6])
  })
  it('checks "diff" with the same data', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).diff([1,6])(), [2,3,4,5])
    assert.deepEqual(arrayDsl([1,2,3,4,5]).diff([1,6]).diff([1,6])() [2,3,4,5])
    assert.deepEqual(arrayDsl([1,6]).diff([1,2,3,4,5]).diff([1,6])(), [])
  })
})
