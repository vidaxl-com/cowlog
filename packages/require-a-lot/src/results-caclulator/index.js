module.exports = (ralContainer) => {
  let { results } = ralContainer
  const { parameters, infoList, noPackageInfo, requireModuleInstance } = ralContainer

  require('./from')(ralContainer)
    .forEach(partialResult => {
      results = Object.assign(results, partialResult)
    })
  require('./hide')(parameters, results)

  results = require('../container')(parameters, results, requireModuleInstance, infoList)

  return ({ results, noPackageInfo, infoList })
}
