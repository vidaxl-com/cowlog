const arrayDsl = require('array-dsl')
const { parseScript } = require('esprima')

module.exports = (parameters, results, requireModuleInstance, infoList) => {
  if (
    parameters.command.has('define') ||
    parameters.command.has('compose') ||
    parameters.command.has('create')
    // todo: createFactory
  ) {
    const define = parameters.arguments('define', 'allEntries', [])
    const defineVariables = define.map(defined => defined[0])

    const compose = parameters.arguments('compose', 'allEntries', [])
    const composeVariables = compose.map(composed => composed[0])

    const create = parameters.arguments('create', 'allEntries', [])
    const createVariables = create.map(created => created[0])

    const proxy = require('./proxy')(parameters, results, { defineVariables, composeVariables, createVariables })

    // todo: remove duplicates
    define.map(defineDetails => {
      const returnObject = {}
      infoList[defineDetails[0]] = { head: `*di parameter*` }
      returnObject[defineDetails[0]] = defineDetails[1]
      return returnObject
    }).forEach(composed => Object.assign(results, composed))

    compose.map(composeDetails => {
      const returnObject = {}
      const data = typeof composeDetails[1] === 'string'
        ? requireModuleInstance(composeDetails[1])
        : composeDetails[1]
      let parameterNames = composeDetails[2]
        ? arrayDsl(composeDetails[2]).arrify()
        : parseScript(data.toString()).body[0].expression.params.map(e => e.name)
      // l(data, parseScript(data.toString() ))()
      infoList[composeDetails[0]] = { head: `*di service*` }
      returnObject[composeDetails[0]] = () => data(
        ...parameterNames.map(dependecyName => proxy[dependecyName]))
      return returnObject
    }).forEach(composed => Object.assign(results, composed))

    create.map(createDetails => {
      const returnObject = {}
      const factoryDefinition = typeof createDetails[1] === 'string'
        ? requireModuleInstance(createDetails[1])
        : createDetails[1]
      let parameterNames = createDetails[2]
        ? arrayDsl(createDetails[2]).arrify()
        : parseScript(factoryDefinition.toString()).body[0].expression.params.map(e => e.name)
      infoList[createDetails[0]] = { head: `*di factoy result* ` }
      infoList[createDetails[0] + 'Factory'] = { head: `*di factoy* ` }

      returnObject[createDetails[0]] = () => factoryDefinition(
        ...parameterNames.map(dependecyName => proxy[dependecyName]))

      returnObject[createDetails[0] + 'Factory'] = () => proxy[createDetails[0]]

      return returnObject
    }).forEach(composed => Object.assign(results, composed))

    return proxy
  }

  return results
}
