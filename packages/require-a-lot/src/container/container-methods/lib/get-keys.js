module.exports = (data, kind) => {
  const returnObject = {}
  data.forEach((d) => returnObject[d[0]] = {kind})

  return returnObject
}
