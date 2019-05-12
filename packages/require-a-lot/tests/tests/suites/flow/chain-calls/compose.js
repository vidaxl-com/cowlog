// [require-a-lot] testRequires begin
const {
  assert, // *node module*: assert |
  requireALot, //  The main library itself. |
}
// [require-a-lot] testRequires end
  = require('../../../../lib/requires')

describe('.compose', () => {
  it('tests .compose()', () => {
    const template = requireALot(require)('assert', 'chai')
      .from('chai', ['expect'])
      .compose('myCustomStuff', (assert, expect) => ({a: assert, e: expect}), ['assert', 'expect'])
      ()
    const myCustomStuffKeys = Object.keys(template.myCustomStuff)
    // l(template.myCustomStuff)()
    assert(myCustomStuffKeys.includes('e'))
    assert(myCustomStuffKeys.includes('a'))
    assert(typeof template.myCustomStuff.e === 'function', 'e should be a function')
    assert(typeof template.myCustomStuff.a === 'function', 'a should be a function')
  })

  it('tests .compose() more complex example', () => {
    const template = requireALot(require)('assert', 'chai')
      .from('chai', ['expect'])
      .compose('myCustomStuff3', (myObject) => myObject, ['myCustomStuff2'])
      .compose('myCustomStuff', (assert, expect) => ({a: assert, e: expect}), ['assert', 'expect'])
      .compose('myCustomStuff2', (myObject) => myObject, ['myCustomStuff'])
      ()

    const myCustomStuffKeys = Object.keys(template.myCustomStuff2)
    assert(myCustomStuffKeys.includes('e'))
    assert(myCustomStuffKeys.includes('a'))
    assert(typeof template.myCustomStuff2.e === 'function')
    assert(typeof template.myCustomStuff2.a === 'function')
  })

})
