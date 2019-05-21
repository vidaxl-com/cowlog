// [require-a-lot] testIncludes begin
const {
  arrayDsl, // *alias* of src |
  assert // *node module*: assert | https://nodejs.org/api/assert.html |
}
// [require-a-lot] testIncludes end
  =
  require('../../requires')

describe('arrayFindIndexs tests',()=>{
  it('arrayFindIndex', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).arrayFindIndex(x=>x===2)(), 1)
  })
})
