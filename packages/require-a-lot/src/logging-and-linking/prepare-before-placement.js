module.exports = (str) => {
  const pos = str.lastIndexOf(',')
  return str.substring(0, pos) + '' + str.substring(pos + 1)
}
