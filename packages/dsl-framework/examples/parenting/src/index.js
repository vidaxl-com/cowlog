const dslF = require('dsl-framework').noTriggerEndOfExecution.noPromoises()

const flat = require('flat'); const op = require('object-path')

const arrayDsl = require('array-dsl')

const partentFunctionFactory = (object, path) => () => op.get(object, path)

const childrenFunctionFactory = (object, path) => () => Object.keys(op.get(object, path)).map(key => path
  ? op.get(object, `${path}.${key}`) : op.get(object, `${key}`))

module.exports = (object) => dslF(function (returnCode, data) {
  const parentName = data.arguments('parentName', 'lastArgument', 'parent')

  const childrenName = data.arguments('childrenName', 'lastArgument', 'children')

  const noParent = data.command.has('noParent')

  // todo: even use flat library... that will be part of the system.
  // , noChildren = data.action.has.no.children()

  // make a data abstraction system
  //

  const noChildren = data.command.has('noChildren'); const keysPaths = Object.keys(flat(object))

  // , registrationPath = data.command.has('toTag')?(()=>{})():data.arguments('toTag')

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
      if (!noChildren)op.set(object, aggregatedPath + '.' + childrenName, childrenFunctionFactory(object, parentPath))
      if (!noParent) {
        (() => {
          op.set(object, aggregatedPath + '.' + parentName, partentFunctionFactory(object, parentPath))
          op.set(object, aggregatedPath + '.' + parentPath + '.path', aggregatedPath)
        })()
      }
    })
  })
  return object
})
