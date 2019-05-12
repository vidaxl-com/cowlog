module.exports = (requireModuleInstance, parameters, dependenctLibraries) => {
  let results = {}
  const infoList = []
  const noPackageInfo = []
  const alias = parameters.arguments('alias', 'allEntries', [[]])
  const from = parameters.arguments('from', 'allEntries', [[]])
  const info = parameters.command.has('info')

  require('./from')(dependenctLibraries, requireModuleInstance, noPackageInfo, infoList, info, from, alias)
    .forEach(partialResult => {
      results = Object.assign(results, partialResult)
    })
  require('./hide')(parameters, results)

  results = require('../container')(parameters, results, requireModuleInstance, infoList)

  return ({ results, noPackageInfo, infoList })
}
