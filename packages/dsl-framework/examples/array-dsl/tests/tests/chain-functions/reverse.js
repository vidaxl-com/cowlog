// [require-a-lot] testIncludes begin
const {
  arrayDsl,
  assert, //node module: assert
}
// [require-a-lot] testIncludes end
  =
  require('../../requires')

describe('reverse tests',()=>{
  it('reverse', function () {
    const result = arrayDsl([1,2,3,4,5], true)().dsl.reverse()
    assert(result.dsl)
    delete result.dsl
    assert.deepEqual(result, [5,4,3,2,1])
  })

})
