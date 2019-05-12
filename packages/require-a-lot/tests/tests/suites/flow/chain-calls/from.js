// [require-a-lot] testRequires begin
const {
  assert, // *node module*: assert |
  requireALot, //  The main library itself. |
}
// [require-a-lot] testRequires end
  = require('../../../../lib/requires')

describe('.from', () => {
  it('tests .from()', () => {
    const tst = requireALot(require)('chai').from('chai', ['expect'])()
    assert(tst.chai)
    assert(tst.expect)
  })
})
