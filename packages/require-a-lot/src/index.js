const container = require('./app-container')
module.exports = (requireModuleInstance) => function () {
  const dependenctLibraries = arguments
  return require('dsl-framework').noPromises()(
    (e, parameters) => {
      const ralContainer = container
        .define('parameters', parameters)
        .define('requireModuleInstance', requireModuleInstance)
        .define('dependenctLibraries', dependenctLibraries)
        .define('results', {})
        .define('infoList', [])
        .define('noPackageInfo', [])()
      const { results } = require('./results-caclulator')(ralContainer);
      (parameters.command.has.or('log', 'linkDirectory')) &&
        require('./logging-and-linking')(parameters, ralContainer.infoList, ralContainer.results);

      (parameters.command.has('mapping')) &&
        require('./mapping')(ralContainer)

      return results
    })
}

module.exports.container = container
