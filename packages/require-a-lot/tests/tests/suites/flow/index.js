// [require-a-lot] testRequires begin
const {
  path, // *node module*: path | https://nodejs.org/api/path.html |
  requireDir // require-dir@1.2.0 | https://github.com/aseemk/requireDir | Helper to require() directories. |
}
// [require-a-lot] testRequires end
  = require('../../../lib/requires')

requireDir(path.join(__dirname, 'chain-calls'))
