// [require-a-lot] testRequires begin
const {
  assert, //node module: assert
  requireALot,
}
// [require-a-lot] testRequires end
  = require('../../../lib/requires')

describe('container tests', () =>{
  it('tests .create .compose .define combo',() => {
    const template = requireALot(require)('assert','chai')
      .from('chai',['expect'])
      .define('one',1)
      // .define('composedStuff',2)
      .compose('composedStuff',(assert, expect, one)=>({a:assert,e:expect, one}), ['assert', 'expect','one'])
      .create('castLogicalFalse',(assert,one,composedStuff)=>{
        const randomValue = Math.floor(Math.random() * Math.floor(100));
        return (someBoolean)=>{
          try{
            assert(someBoolean)
            // l({randomValue,one,composedStuff}).die()
            return {randomValue,someBoolean,one,composedStuff}
          }catch(e){
            return false
          }
        }
      }, ['assert','one','composedStuff'])
      ()
    assert(template.castLogicalFalse(true).one === 1)
    assert(template.castLogicalFalse(true).composedStuff.one === 1)
    const checkIfNotZero = ((template.castLogicalFalse(true).randomValue - template.castLogicalFalse(true).randomValue)
      +
      (template.castLogicalFalse(true).randomValue - template.castLogicalFalse(true).randomValue)
      +
      (template.castLogicalFalse(true).randomValue - template.castLogicalFalse(true).randomValue)
      +
      (template.castLogicalFalse(true).randomValue - template.castLogicalFalse(true).randomValue))
    assert(
      checkIfNotZero !== 0
    )
  })
})
