const camelCase = require('camelcase');

module.exports = (require) => function () {
  let results = {}
  Array.from(arguments).map(argument=>(()=>{
    const camelCasedName = camelCase(argument)
    let obj = {}
    obj[camelCasedName] = require(argument)

    return obj
  })())
  .forEach(result=>{
    const key = Object.keys(result)[0]
    results[key] = result[key]
  })
  // l(results).keys()
  return results
}
