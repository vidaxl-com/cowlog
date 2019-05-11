module.exports = (requireModuleInstance) => function () {
  const dependenctLibraries = arguments
  return require('dsl-framework').noPromises()(
    (e, parameters) => {
      const {
        results,
        infoList
      } = require('./results-caclulator')(requireModuleInstance, parameters, dependenctLibraries);
      (parameters.command.has('log') || parameters.arguments('linkDirectory', 'lastArgument')) &&
        require('./logging-and-linking')(parameters, infoList, results)

      return results
    })
}
