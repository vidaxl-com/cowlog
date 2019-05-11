const composedStore = {}
const arrayDsl = require('array-dsl')
module.exports = (parameters, results) => {
  if (
    parameters.command.has('define') ||
    parameters.command.has('compose') ||
    parameters.command.has('create')
  ) {
    const define = parameters.arguments('define', 'allEntries', [])
    const defineVariables = define.map(defined => defined[0])

    const compose = parameters.arguments('compose', 'allEntries', [])
    const composeVariables = compose.map(composed => composed[0])

    const create = parameters.arguments('create', 'allEntries', [])
    const createVariables = create.map(created => created[0])

    const proxy = new Proxy(results,
      {
        get: (obj, prop) => {
          if (Object.keys(obj).includes(prop)) {
            const defineHasKey = defineVariables.includes(prop)
            if (defineHasKey) {
              return obj[prop]
            }

            const composeHasKey = composeVariables.includes(prop)
            if (composeHasKey) {
              if (Object.keys(composedStore).includes(prop)) {
                return composedStore[prop]
              } else {
                composedStore.prop = obj[prop]()
                return composedStore.prop
              }
            }
            const createHasKey = createVariables.includes(prop)

            if (createHasKey) {
              return obj[prop]()
            }

            if (!createHasKey || !composeHasKey || defineHasKey) {
              return obj[prop]
            }
          }
        },
        set: (obj, prop, value) => {
          obj[prop] = value
          return true
        }
      })

    define.map(composed => {
      const returnObject = {}
      returnObject[composed[0]] = composed[1]
      return returnObject
    }).forEach(composed => Object.assign(results, composed))

    compose.map(composed => {
      const returnObject = {}
      returnObject[composed[0]] = () => composed[1](
        ...arrayDsl(composed[2]).arrify().map(dependecyName => proxy[dependecyName]))
      return returnObject
    }).forEach(composed => Object.assign(results, composed))

    create.map(composed => {
      const returnObject = {}
      returnObject[composed[0]] = () => composed[1](
        ...arrayDsl(composed[2]).arrify().map(dependecyName => proxy[dependecyName]))
      return returnObject
    }).forEach(composed => Object.assign(results, composed))

    return proxy
  }

  return results
}
