module.exports = (requireModuleInstance, parameters, secondArguments) => {
  let results = {}
  const infoList = []
  const noPackageInfo = []
  const alias = parameters.arguments('alias', 'allEntries', [])
  const from = parameters.arguments('from', 'allEntries', [[[]]])
  const info = parameters.command.has('info')

  require('./from')(secondArguments, requireModuleInstance, noPackageInfo, infoList, info, from, alias)
    .forEach(partialResult => {
      results = Object.assign(results, partialResult)
    })
  require('./hide')(parameters, results)

  results = require('../container')(parameters, results)

  return ({ results, noPackageInfo, infoList })
}
