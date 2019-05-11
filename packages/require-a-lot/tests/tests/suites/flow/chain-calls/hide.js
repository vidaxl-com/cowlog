// [require-a-lot] testRequires begin
const {
  capture, //reative path: ../lib/capture
  assert, //node module: assert
  requireALot,
}
// [require-a-lot] testRequires end
= require('../../../../lib/requires')

describe('.hide', () =>{
  it('tests .hide()',() => {
    const template = requireALot(require)('chai').from('chai',['expect']).hide('chai')
    const tst = template()
    assert(!tst.chai)
    assert(tst.expect)
  })

  it('tests .hide() with .log()',() => {
    const template = requireALot(require)('chai').from('chai',['expect']).hide('chai')('log')
    let result = null
    const output = capture(()=>{result = template()})
    assert(!output.includes('chai'))
    assert(output.includes('expec'))
    assert(result.expect)
  })
})
