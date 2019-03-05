const camelCase = require('camelcase');

module.exports = (require) => function () {
  let results = {}
  Array.from(arguments).map(argument=>(()=>{
    let name = argument
    if(name.includes('/')){
      name = name.slice(name.lastIndexOf('/')+1, name.last)
    }
    let obj = {}
    obj[camelCase(name)] = require(argument)

    return obj
  })())
    .forEach(result=>{
      const key = Object.keys(result)[0]
      results[key] = result[key]
    })
  // l(results).keys()
  return results
}
