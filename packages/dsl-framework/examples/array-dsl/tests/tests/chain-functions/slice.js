// [require-a-lot] testIncludes begin
const {
  arrayDsl,
  assert, //node module: assert
}
// [require-a-lot] testIncludes end
  =
  require('../../requires')

describe('slice tests',()=> {
  it('checks "slice" with one parameter', function () {
    assert.deepEqual(arrayDsl([1, 2, 3, 4, 5]).xor([1, 6]).xor([1, 6]).sort.slice(1)(), [2, 3, 4, 5])
  })
  it('checks "slice" with two parameter', function () {
    assert.deepEqual(arrayDsl([1, 2, 3, 4, 5]).xor([1, 6]).xor([1, 6]).sort.slice(1, 3)(), [2, 3])
  })
})
