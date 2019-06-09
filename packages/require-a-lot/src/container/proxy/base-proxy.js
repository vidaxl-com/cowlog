const composedStore = {}
const parameterGetter = (parameters) =>
  parameters.arguments('define', 'allEntries', []).map(composed => composed[0])
module.exports = (parameters, results) => {
  const compose = parameters.arguments('compose', 'allEntries', [])
  const composeVariables = compose.map(composed => composed[0])

  const create = parameters.arguments('create', 'allEntries', [])
  const createVariables = create.map(created => created[0])

  return new Proxy(results,
    {
      get: (obj, prop) => {
        if (Object.keys(obj).includes(prop)) {
          const createHasKey = createVariables.includes(prop)
          const composeHasKey = composeVariables.includes(prop)
          if (parameterGetter(parameters).includes(prop)) {
            return obj[prop]
          }
          if (composeHasKey) {
            if (Object.keys(composedStore).includes(prop)) {
              return composedStore[prop]
            } else {
              composedStore.prop = obj[prop]()
              return composedStore.prop
            }
          }
          if (createHasKey) {
            return obj[prop]()
          }
          if (!createHasKey || !composeHasKey) {
            return obj[prop]
          }
        }
      },
      set: (obj, prop, value) => {
        obj[prop] = value
        return true
      }
    })
}
