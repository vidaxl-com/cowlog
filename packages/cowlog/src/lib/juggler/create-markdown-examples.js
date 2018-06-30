const testExec = require('../../../tests/lib/external-test-executor')

let promiseFactory = (test) => {
  return new Promise((resolve) => {
    testExec(test, function (output) {
      resolve(output)
    })
  })
}

let promisesFactory = (testArray) => {
  let promises = []
  testArray.forEach(function (testName) {
    promises.push(promiseFactory(testName))
  })
  return promises
}

module.exports = exports = (testArray, callback, textBefore = '', textAfter = '') => {

  let result = ''
  Promise.all(promisesFactory(testArray)).then((outputs) => {
    outputs.forEach(function (output) {
      result += output
    })
  }).then(function () {
    callback(textBefore + result + textAfter)
  })

}
