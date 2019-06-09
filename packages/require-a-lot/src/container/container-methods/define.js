module.exports = (parameters, infoList, results) => {
  const define = parameters.arguments('define', 'allEntries', [])
  define.length &&
  (() => {
    define.map(defineDetails => {
      const returnObject = {}
      infoList[defineDetails[0]] = { head: `*di parameter*` }
      returnObject[defineDetails[0]] = defineDetails[1]
      return returnObject
    }).forEach(composed => Object.assign(results, composed))
  })()

  return require('./lib/get-keys')(define, 'parameter')
}
