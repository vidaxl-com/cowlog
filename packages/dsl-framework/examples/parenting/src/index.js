const dslF = require('dsl-framework').noTriggerEndOfExecution.noPromoises()
const flat = require('flat')
const op = require('object-path')
const arrayDsl = require('array-dsl')
module.exports = (object) => dslF(function (returnCode, data) {
  const keysPaths = Object.keys(flat(object))
  const result = arrayDsl(keysPaths.map(path => {
    let pathArray = path.split('.')
    pathArray.pop()
    return pathArray
  })).unique()

  const partentFunctionFactory = (object, path) => () => op.get(object, path)

  const childrenFunctionFactory = (object, path) => () => {
    return Object.keys(op.get(object, path)).map(key => {
      return path
        ? op.get(object, `${path}.${key}`)
        : op.get(object, `${key}`)
    })
  }

  result.forEach(pathArray => {
    let aggregatedPath = ''
    pathArray.forEach((pathPiece, idx) => {
      const parentPath = aggregatedPath
      aggregatedPath = idx ? aggregatedPath + '.' : ''
      aggregatedPath += pathPiece
      childrenFunctionFactory(object, parentPath)

      // children
      op.get(object, aggregatedPath).children = childrenFunctionFactory(object, parentPath)

      // parent
      op.get(object, aggregatedPath).parent = partentFunctionFactory(object, parentPath)

      const parentFunction = op.get(object, aggregatedPath + '.parent')
      parentFunction.path = aggregatedPath
    })
  })
  return object
})
