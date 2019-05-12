// [require-a-lot] testIncludes begin
const {
  arrayDsl, // undefined
}
// [require-a-lot] testIncludes end
  =
  require('../../requires')

describe('arrayFindIndexs tests',()=>{
  it('checks "uniqueRandomArray" ', function () {
    const items = arrayDsl([1,2]).uniqueRandomArray()
    for(let i = 0; i <= 3; i++){
      let item = items()
      if(!(item === 1 || item === 2)){
        throw `something bad happened ${item}`
      }
    }
  })
})
