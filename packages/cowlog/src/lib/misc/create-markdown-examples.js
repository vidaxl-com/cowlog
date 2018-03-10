const testExec = require('../../../tests/lib/external-test-executor')
module.exports = exports = (testArray, callback, documentationName = 'default') => {
  module.results = []
  module.output = ''

  process.env.markdown = true
  process.env.documentationName = documentationName

  let promiseFactory = (test) => {
    return new Promise((resolve) => {
      testExec(test, function (output) {
        module.results.push(output)
        resolve(output)
      })
    })
  }

  let promisesFactory = () => {
    let promises = []
    testArray.forEach(function (testName) {
      promises.push(promiseFactory(testName))
    })

    return promises
  }

  let result = ''
  Promise.all(promisesFactory()).then((outputs) => {
    outputs.forEach(function (output) {
      if (!process.env.markdown) {
        result += output
      } else {
        result +=  output + '\n```\n'
      }
    })
  }).then(function () {
    callback(result)
  })

}
