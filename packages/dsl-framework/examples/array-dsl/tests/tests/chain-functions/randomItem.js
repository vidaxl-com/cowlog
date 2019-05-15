// [require-a-lot] testIncludes begin
const {
  arrayDsl // undefined
}
// [require-a-lot] testIncludes end
  =
  require('../../requires')

describe('arrayFindIndexs tests',()=>{
  it('checks "randomItem" ', function () {
    const item = arrayDsl([1,2]).randomItem()
    if(!(item === 1 || item === 2)){
      throw `something bad happened ${item}`
    }
  })
})
