const capcon = require('capture-console');

module.exports = (fn) => {
  return capcon.captureStdout(function scope() {
    fn()
  }).replace(/^\s+|\s+$/g, '')
}
