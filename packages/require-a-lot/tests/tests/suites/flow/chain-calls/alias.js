// [require-a-lot] testRequires begin
const {
  assert, // *node module*: assert | https://nodejs.org/api/assert.html |
  requireALot // *alias* of ../../src | The main library itself. |
}
// [require-a-lot] testRequires end
  = require('../../../../lib/requires')

describe('.alias functionality', () => {
  it('default behaviour', () => {
    const tst = requireALot(require)('../../../test-spec').alias('test-spec', 'cc')()
    assert(tst.cc)
    assert(!tst['testSpec'])
  })

  it('does not exists the alias', () => {
    const tst = requireALot(require)('../../../test-spec').alias('this-does-not-exists', 'cc')()
    assert(!tst.cc)
    assert(tst['testSpec'])
  })

  it('want to multiple aliases to the same library (not a reat idea, but works)', () => {
    const tst = requireALot(require)('../../../test-spec').alias('test-spec', 'cc').alias('test-spec', 'ccc')()
    assert(tst.cc)
    assert(!tst.ccc)
  })

})
