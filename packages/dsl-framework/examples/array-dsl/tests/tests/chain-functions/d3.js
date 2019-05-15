// [require-a-lot] testIncludes begin
const {
  arrayDsl, // undefined
  assert // *node module*: assert | https://nodejs.org/api/assert.html |
}
// [require-a-lot] testIncludes end
  =
  require('../../requires')

describe('d3 tests',()=>{
  it('checks "d3" min',  () => {
    // assert.deepEqual(arrayDsl([1,2,3,4,5]).min.arrify(),[1])
    assert.deepEqual(arrayDsl([1,2,3,4,5]).min(),1)
  })
  it('checks "d3" max',  () => {
    // assert.deepEqual(arrayDsl([1,2,3,4,5]).min.arrify(),[1])
    assert.deepEqual(arrayDsl([1,2,3,4,5]).max(),5)
  })
  it('checks "d3" extent',  () => {
    // assert.deepEqual(arrayDsl([1,2,3,4,5]).min.arrify(),[1])
    assert.deepEqual(arrayDsl([1,2,3,4,5]).extent(),[1,5])
  })
  it('checks "d3" sum',  () => {
    // assert.deepEqual(arrayDsl([1,2,3,4,5]).min.arrify(),[1])
    assert.deepEqual(arrayDsl([1,2,3,4,5]).sum(),15)
  })
  it('checks "d3" median',  () => {
    // assert.deepEqual(arrayDsl([1,2,3,4,5]).min.arrify(),[1])
    assert.deepEqual(arrayDsl([1,2,3,4,5]).median(),3)
    assert.deepEqual(arrayDsl([0,10]).median(),5)
  })
  it('checks "d3" quantile',  () => {
    // assert.deepEqual(arrayDsl([1,2,3,4,5]).min.arrify(),[1])
    assert.deepEqual(arrayDsl([1,2,3,4,5]).quantile(1)(),5)
    assert.deepEqual(arrayDsl([1,2,3,4,5]).quantile(0)(),1)
    assert.deepEqual(arrayDsl([1,2,10]).quantile(0.75)(),6)
  })
  it('checks "d3" variance',  () => {
    // assert.deepEqual(arrayDsl([1,2,3,4,5]).min.arrify(),[1])
    assert.deepEqual(arrayDsl([1,2,3,4,5]).variance(),2.5)
  })
  it('checks "d3" deviation',  () => {
    // assert.deepEqual(arrayDsl([1,2,3,4,5]).min.arrify(),[1])
    assert.deepEqual(arrayDsl([1,2,3,4,5]).deviation(),1.5811388300841898)
  })
  // it('checks "d3" with arguments', function () {
  //   assert.deepEqual(arrayDsl([1,2,3,4,5]).diff([1,6])(), [2,3,4,5])
  //   assert.deepEqual(arrayDsl([1,6]).diff([1,2,3,4,5])(), [6])
  // })
  // it('checks "d3" with the same data', function () {
  //   assert.deepEqual(arrayDsl([1,2,3,4,5]).diff([1,6])(), [2,3,4,5])
  //   assert.deepEqual(arrayDsl([1,2,3,4,5]).diff([1,6]).diff([1,6])() [2,3,4,5])
  //   assert.deepEqual(arrayDsl([1,6]).diff([1,2,3,4,5]).diff([1,6])(), [])
  // })
})
