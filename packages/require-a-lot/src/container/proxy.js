const composedStore = {}
module.exports = (parameters, results, variables) => {
  const { defineVariables, composeVariables, createVariables } = variables
  return new Proxy(results,
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
}
