const evaluated = {}
const arrayDsl = require('array-dsl')
module.exports = (parameters, results) => {
  if(parameters.command.has('compose')){
    // const variables = []

    const compose = parameters.arguments('compose', 'allEntries')
    const variables = compose.map(composed=>composed[0])
    const proxy = new Proxy(results,
      {
        get: (obj, prop) => {
          if(Object.keys(obj).includes(prop)){
            if(variables.includes(prop)){
              if(Object.keys(evaluated).includes(prop)){
                return evaluated[prop]
              }else{
                return evaluated.prop = obj[prop]()
              }
            }
            else{
              return obj[prop]
            }
          }
        },
        set: (obj, prop, value)=> {
          obj[prop] = value
          return true
        }
      })

    const allComposedVarianbles = compose.map(row=>row[0])
    compose.map(composed=>{
      const returnObject = {}
      returnObject[composed[0]]=()=>composed[1]
        (...arrayDsl(composed[2]).arrify().map(dependecyName=>proxy[dependecyName]))
      return returnObject
    }).forEach(composed=>Object.assign(results,composed))

    return proxy
  }

  return results
}
