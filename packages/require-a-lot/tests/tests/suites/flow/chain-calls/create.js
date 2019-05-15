// [require-a-lot] testRequires begin
const {
  assert, // *node module*: assert | https://nodejs.org/api/assert.html |
  requireALot //  The main library itself. |
}
// [require-a-lot] testRequires end
  = require('../../../../lib/requires')

describe('.create', () => {
  it('tests .create()', () => {
    const template = requireALot(require)('assert', 'chai')
      .from('chai', ['expect'])
      .create('myCustomStuff', () => {
        const randomValue = Math.floor(Math.random() * Math.floor(100))

        return (someBoolean) => {
          try {
            assert(someBoolean)
            return randomValue
          } catch (e) {
            return false
          }
        }
      })
      ()
    // const myCustomStuffKeys = Object.keys(template.myCustomStuff)
    const tmp = template.myCustomStuff
    assert(tmp(true) === tmp(true))
    assert(template.myCustomStuff(true) !== template.myCustomStuff(true))
  })

  //todo: create test with parameters and composed sutt

})
