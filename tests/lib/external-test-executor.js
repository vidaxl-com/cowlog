const exec = require('sync-exec')
module.exports = function (test) {
  let out = exec('node_modules/nyc/bin/nyc.js --reporter=lcov node tests/external-tests/' + test + '-test.js')
  let capturedText = out.stdout

  return capturedText
}
