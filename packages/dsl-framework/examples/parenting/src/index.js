const dependecies = require('require-a-lot')(require)('array-dsl', 'flat', 'object-path', 'dsl-framework')
const { arrayDsl,
  flat,
  objectPath,
  dslFramework
} = dependecies

const dslF = dslFramework.noTriggerEndOfExecution.noPromoises()
const parentFunctionFactory = (object, path) => () => objectPath.get(object, path)
const childrenFunctionFactory = (object, path) => () => Object.keys(objectPath.get(object, path)).map(key => path
  ? objectPath.get(object, `${path}.${key}`) : objectPath.get(object, `${key}`))

module.exports = exports = (object) => dslF(function (returnCode, data) {
  const parentName = data.arguments('parentName', 'lastArgument', 'parent')
  const childrenName = data.arguments('childrenName', 'lastArgument', 'children')
  const noParent = data.command.has('noParent')
  const noChildren = data.command.has('noChildren'); const keysPaths = Object.keys(flat(object))

  const result = arrayDsl(keysPaths.map(path => {
    let pathArray = path.split('.')
    pathArray.pop()
    return pathArray
  })).unique()

  result.forEach(pathArray => {
    let aggregatedPath = ''
    pathArray.forEach((pathPiece, idx) => {
      const parentPath = aggregatedPath
      aggregatedPath = idx ? aggregatedPath + '.' : ''
      aggregatedPath += pathPiece
      childrenFunctionFactory(object, parentPath)
      if (!noChildren) {
        objectPath.set(object, aggregatedPath + '.' + childrenName, childrenFunctionFactory(object, parentPath))
      }
      if (!noParent) {
        objectPath.set(object, aggregatedPath + '.' + parentName, parentFunctionFactory(object, parentPath))
        objectPath.set(object, aggregatedPath + '.' + parentPath + '.path', aggregatedPath)
      }
    })
  })
  return object
})
// module.packages = require('require-a-lot')(require)('array-dsl', 'flat', 'object-path', 'dsl-framework')
// const parentName = data.arguments('parentName', 'lastArgument', 'parent')
// const childrenName = data.arguments('childrenName', 'lastArgument', 'children')
// const noParent = data.command.has('noParent')
// // const excludePathIncludes = data.arguments('excludePathIncludes', 'lastArgument', 'writeSomethingWeird and impossible')
// // todo: even use flat library... that will be part of the system.
// // , noChildren = data.action.has.no.children()
// // make a data abstraction system
// const noChildren = data.command.has('noChildren'); const keysPaths = Object.keys(flat(object))
// // , registrationPath = data.command.has('toTag')?(()=>{})():data.arguments('toTag')
