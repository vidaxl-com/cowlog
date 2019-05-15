/* eslint-env mocha */
require('cowlog')()
// [require-a-lot] testRequires begin
const {
  requireDir, // require-dir@1.2.0 | https://github.com/aseemk/requireDir | Helper to require() directories. |
  path, // *node module*: path | https://nodejs.org/api/path.html |
}
// [require-a-lot] testRequires end
  = require('../lib/requires')

// require('../assets/001/requires')
requireDir(path.join(__dirname, 'suites'), {recurse: true})
module.exports = (parameter) => parameter
