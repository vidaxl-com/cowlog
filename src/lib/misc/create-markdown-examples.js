const testExec = require('../tests/lib/external-test-executor')
module.exports = exports = (testArray) => {

  module.results = []
  module.output = ''

  process.env.markdown = true

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

  Promise.all(promisesFactory()).then((outputs) => {
    outputs.forEach(function (output) {
      console.log(output)
    })
  })
}
