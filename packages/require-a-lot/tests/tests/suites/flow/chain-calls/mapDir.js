// [require-a-lot] testRequires begin
const {
  assert, // *node module*: assert | https://nodejs.org/api/assert.html |
  mapDirAssetDir, // *di service* |
  path // *node module*: path | https://nodejs.org/api/path.html |
}
// [require-a-lot] testRequires end
  = require('../../../../lib/requires')

describe('.mapDir tess', () => {
  require('../../../../assets/map-dir/requires')
  it('testing a simple file', () => {
    assert(require(path.join(mapDirAssetDir, 'code001')) === 3)
  })

  it('testing a file that named index.js', () => {
    assert(require(path.join(mapDirAssetDir, 'code002')) === -1)
  })
})
