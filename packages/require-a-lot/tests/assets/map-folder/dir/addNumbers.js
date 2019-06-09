module.exports = function () {
  return Array.from(arguments).reduce((acc = 0, currentValue) => {
    acc += currentValue
  })
}
