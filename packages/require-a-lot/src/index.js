module.exports = (requireModuleInstance) => function () {
  const secondArguments = arguments
  return require('dsl-framework').noPromises()(
    (e, parameters) => {
      const {
        results,
        infoList
      } = require('./results-caclulator')(requireModuleInstance, parameters, secondArguments)()
      let action =
        parameters.command.has('log') || parameters.arguments('linkDirectory', 'lastArgument')
          ? require('./actions') : () => {}
      action(parameters, infoList, results)
      return results
    })
}
