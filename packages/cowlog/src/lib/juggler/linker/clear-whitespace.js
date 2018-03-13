module.exports = exports = function (stringWithWhiteSpaces) {
  return stringWithWhiteSpaces.toString().replace(/\s/g, '')
}
