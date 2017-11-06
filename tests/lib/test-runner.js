const cowlog = require('./cowlog-provider')()
const printPresentationInfo = !process.env.mocha

module.exports = exports = function (logf) {
  return function () {
    if (printPresentationInfo) {
      console.log('console.log.apply (this, ', arguments, ') \noutput:\n')
      console.log.apply(this, arguments)
      console.log('***********************')
    }
    if (logf) {
      if (printPresentationInfo) {
        console.log('console.log.apply (this, ', arguments, ')')
      }
      return cowlog.logf.apply(this, arguments)
    }
    if (!logf) {
      console.log('\ncowlog.log:')
      return cowlog.log.apply(this, arguments)
    }
  }
}
