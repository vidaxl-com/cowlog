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

      const {
        results
      } = require('./results-caclulator')(ralContainer);

      (parameters.command.has('log') || parameters.arguments('linkDirectory', 'lastArgument')) &&
        require('./logging-and-linking')(parameters, ralContainer.infoList, ralContainer.results)

      return results
    })
}

module.exports.container = container
