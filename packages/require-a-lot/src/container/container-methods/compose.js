const { parseScript } = require('esprima')
const arrayDsl = require('array-dsl')

module.exports = (parameters, infoList, results, requireModuleInstance, proxy) => {
  const compose = parameters.arguments('compose', 'allEntries', [])
  compose.length &&
  (() => {
    compose.map(composeDetails => {
      const returnObject = {}
      const data = typeof composeDetails[1] === 'string'
        ? requireModuleInstance(composeDetails[1])
        : composeDetails[1]
      let parameterNames = composeDetails[2]
        ? arrayDsl(composeDetails[2]).arrify()
        : parseScript(data.toString()).body[0].expression.params.map(e => e.name)
      // l(data, parseScript(data.toString() ))()
      infoList[composeDetails[0]] = { head: `*di service*` };
      returnObject[composeDetails[0]] = () => data(
        ...parameterNames.map(dependecyName => proxy[dependecyName]))
      return returnObject
    }).forEach(composed => Object.assign(results, composed))
  })()
}
