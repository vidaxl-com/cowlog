const cowlog = require('./cowlog-provider')()
module.exports = exports = function (logf) {
  return function () {
    if (!process.env.mocha) {
      console.log.apply(this, arguments)
    }
    if (logf) {
      return cowlog.logf.apply(this, arguments)
    }
    if (!logf) {
      return cowlog.log.apply(this, arguments)
    }
  }
}
