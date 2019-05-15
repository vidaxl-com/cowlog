const camelCase = require('camelcase')
const arrayDsl = require('array-dsl')
module.exports = (ralContainer, returnObject, name, loclalPath, lokalPackageName) => {
  const { parameters } = ralContainer
  const alias = parameters.arguments('alias', 'allEntries', [[]])
  const aliasKeys = []
  alias.forEach(alias => {
    const originalLibraryName = alias[0]
    const aliasName = alias[1]
    const realIndex = loclalPath ? name : lokalPackageName
    const index = camelCase(realIndex)
    realIndex.endsWith(originalLibraryName) && (() => {
      // l(aliasName)()
      returnObject[aliasName] = loclalPath ? returnObject[name] : returnObject[index]
      loclalPath && (() => {
        aliasKeys.push(name)
        delete returnObject[name]
      })()
      loclalPath || (() => {
        aliasKeys.push(index)
        delete returnObject[index]
      })()
      // loclalPath && l(aliasName, returnObject[aliasName])()
    })()
  })

  Object.keys(returnObject).forEach(key => {
    (loclalPath && !aliasKeys.includes(name)) && (() => {
      returnObject[camelCase(arrayDsl(key.split('/')).last())] = returnObject[name]
      delete returnObject[name]
    })()
  })
}
