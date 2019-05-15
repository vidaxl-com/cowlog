// [require-a-lot] testRequires begin
const {
  assert, // *node module*: assert | https://nodejs.org/api/assert.html |
  requireALot //  The main library itself. |
}
// [require-a-lot] testRequires end
  = require('../../../lib/requires')

describe('Basic Test Suite', function () {
  const tst = requireALot(require)('camelcase', 'chai', 'license-checker', '../../test-spec')()
  const keys = Object.keys(tst)

  it('Checks how much tags the return object has.', function () {
    assert(keys.length === 4)
    keys.map(value => !!value).forEach(value => assert(value))
  })

  it('Checks if the tags are truthy.', function () {
    keys.map(value => !!value).forEach(value => assert(value))
  })

})
