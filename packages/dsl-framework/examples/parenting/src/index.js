const dslF = require('dsl-framework').noTriggerEndOfExecution.noPromoises()
  , flat = require('flat'), op = require('object-path')
  , arrayDsl = require('array-dsl')
  , partentFunctionFactory = (object, path) => () => op.get(object, path)
  , childrenFunctionFactory = (object, path) => () => Object.keys(op.get(object, path)).map(key => path?
    op.get(object, `${path}.${key}`): op.get(object, `${key}`))

module.exports = (object) => dslF(function (returnCode, data) {
  const parentName = data.arguments('parentName', 'lastArgument', 'parent')
    , childrenName = data.arguments('childrenName', 'lastArgument', 'children')
    , noParent = data.command.has('noParent')
    // todo: even use flat library... that will be part of the system.
    // , noChildren = data.action.has.no.children()

    //make a data abstraction system
    //
    , noChildren = data.command.has('noChildren'), keysPaths = Object.keys(flat(object))
    // , registrationPath = data.command.has('toTag')?(()=>{})():data.arguments('toTag')
    , result = arrayDsl(keysPaths.map(path => {
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
      !noChildren?op.get(object, aggregatedPath)[childrenName] = childrenFunctionFactory(object, parentPath):null
      !noParent?(()=>{
          op.get(object, aggregatedPath)[parentName] = partentFunctionFactory(object, parentPath)
          const parentFunction = op.get(object, aggregatedPath + `.${parentName}`)
          parentFunction.path = aggregatedPath
        })():null
    })
  })
  return object
})
