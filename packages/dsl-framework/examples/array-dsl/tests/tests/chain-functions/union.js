// [require-a-lot] testIncludes begin
const {
  arrayDsl, // undefined
  assert, // *node module*: assert |
}
// [require-a-lot] testIncludes end
  =
  require('../../requires')

describe('union tests',()=>{
  it('checks "union"', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).union([1,6])(), [1,2,3,4,5,6])
  })
  it('checks "union" more parameters', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).union([1,6], [7])(), [1,2,3,4,5,6,7])
  })
})
