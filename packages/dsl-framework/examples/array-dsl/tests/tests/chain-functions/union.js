// [require-a-lot] testIncludes begin
const {
  arrayDsl, // *alias* of src |
  assert // *node module*: assert | https://nodejs.org/api/assert.html |
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
