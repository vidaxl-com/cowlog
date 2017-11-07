const cowlog = require('./cowlog-provider')()
const printPresentationInfo = !process.env.mocha
const blockLogOutput = require('kidnap-console').blockLogOutput

module.exports = exports = function (logf) {
  let initFunction = function () {
    let origArguments = arguments
    if (!module.output) {
      let returnValue
      let output

      if (logf) {
        output = blockLogOutput(() => {
          if (printPresentationInfo) {
            console.log('console.logf.apply (this, ', origArguments, ') \noutput:\n')
            console.log.apply(this, arguments)
            console.log('***********************')
          }
          returnValue = cowlog.logf.apply(this, origArguments)
        })
      }
      if (!logf) {
        output = blockLogOutput(() => {
          if (printPresentationInfo) {
            console.log('console.log.apply (this, ', origArguments, ') \noutput:\n')
            console.log.apply(this, arguments)
            console.log('***********************')
          }
          returnValue = cowlog.log.apply(this, origArguments)
        })
      }
      module.output = output.stores.log.join('\n')

      return returnValue
    }
  }

  return {
    print: function () {
      let returnValue
      if (arguments.length) {
        returnValue = initFunction.apply(this, arguments)
      }
      console.log(module.output)
      return returnValue
    },

    init: function () {
      return initFunction.apply(this, arguments)
    }
  }
}
