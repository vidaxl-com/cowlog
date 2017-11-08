const testExec = require('../tests/lib/external-test-executor')
module.exports = exports = () => {

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
    let promises = [
      promiseFactory('basic'),
      promiseFactory('basic-integer'),
      promiseFactory('basic-array'),
      // promiseFactory('basic-function'),
      // promiseFactory('basic-object'),
      // promiseFactory('basic-object2'),
      // promiseFactory('logf'),
      // promiseFactory('last'),
      // promiseFactory('lasts'),
      // promiseFactory('return'),
      // promiseFactory('die')

    ]
    return promises
  }

  Promise.all(promisesFactory()).then((outputs) => {
    outputs.forEach(function (output) {
      console.log(output)
    })
  })
  // .then(function () {
  //   console.log(module.output, module.results.length, "GGGGGGGggggGGggGGggGGggGg")
  // })
}

exports()

