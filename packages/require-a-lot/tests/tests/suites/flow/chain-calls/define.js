// [require-a-lot] testRequires begin
const {
  assert, //node module: assert
  requireALot,
}
// [require-a-lot] testRequires end
= require('../../../../lib/requires')

describe('.create', () =>{
  it('tests .create retuns a function',() => {
    const template = requireALot(require)('assert','chai')
      .from('chai',['expect'])
      .define('myCustomStuff',()=>2)
      ()
    const tmp = template.myCustomStuff
    assert(template.myCustomStuff() === template.myCustomStuff())
    assert(template.myCustomStuff.toString() === tmp.toString())
  })

  it('tests .create returns scalar',() => {
    const template = requireALot(require)('assert','chai')
      .from('chai',['expect'])
      .define('myCustomStuff',2)
      ()
    const tmp = template.myCustomStuff
    assert(template.myCustomStuff === 2)
  })

})
