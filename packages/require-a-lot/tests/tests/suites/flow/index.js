// [require-a-lot] testRequires begin
const {
  requireDir, // require-dir@1.2.0 | https://github.com/aseemk/requireDir | Helper to require() directories.
  path, // node module: path
}
// [require-a-lot] testRequires end
  = require('../../../lib/requires')

requireDir(path.join(__dirname, 'chain-calls'))
