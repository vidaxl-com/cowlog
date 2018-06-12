module.exports = exports = function (argumentsFrom, cb) {

    let collected = []
    console.log("AAA")
    return function () {
      console.log("BBB")
      let returnFunction = function (command) {
        let returnValue = returnFunction
        collected.push(command)
        console.log(collected)
        return returnValue
      }

      return returnFunction()
    }

  console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU')
}
