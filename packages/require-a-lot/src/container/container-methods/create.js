const {parseScript} = require('esprima')
const arrayDsl = require('array-dsl')

module.exports = (parameters, infoList, results, requireModuleInstance, proxy) => {
  const create = parameters.arguments('create', 'allEntries', [])
  create.length &&
  (() => {
    create.map(createDetails => {
      const returnObject = {}
      const factoryDefinition = typeof createDetails[1] === 'string'
        ? requireModuleInstance(createDetails[1])
        : createDetails[1]
      let parameterNames = createDetails[2]
        ? arrayDsl(createDetails[2]).arrify()
        : parseScript(factoryDefinition.toString()).body[0].expression.params.map(e => e.name)
      infoList[createDetails[0]] = { head: `*di factory result* ` }
      infoList[createDetails[0] + 'Factory'] = { head: `*di factory* ` }

      returnObject[createDetails[0]] = () => factoryDefinition(
        ...parameterNames.map(dependecyName => proxy[dependecyName]))

      returnObject[createDetails[0] + 'Factory'] = () => proxy[createDetails[0]]

      return returnObject
    }).forEach(composed => Object.assign(results, composed))
  })()

  return require('./lib/get-keys')(create, 'factory')
}
