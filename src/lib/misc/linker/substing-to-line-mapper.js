module.exports = function (input, find) {
  let inputArray = input.split('\n')
  let returnValue = []
  inputArray.forEach(function (line, lineKey) {
    if (line.includes(find)) {
      returnValue.push(lineKey)
    }
  })

  if (returnValue.length === 1) {
    returnValue = returnValue[0]
  }
  return returnValue
}
