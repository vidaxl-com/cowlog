const camelCase = require('camelcase')
const arrayDsl = require('array-dsl')
module.exports = (ralContainer, returnObject, name, localPath, localPackageName) => {
  const { parameters } = ralContainer
  const alias = parameters.arguments('alias', 'allEntries', [[]])
  const aliasKeys = []
  alias.forEach(alias => {
    const originalLibraryName = alias[0]
    const aliasName = alias[1]
    const realIndex = localPath ? name : localPackageName
    const index = camelCase(realIndex)
    realIndex.endsWith(originalLibraryName) && (() => {
      // l(aliasName)()
      returnObject[aliasName] = localPath ? returnObject[name] : returnObject[index]
      localPath && (() => {
        aliasKeys.push(name)
        delete returnObject[name]
      })()
      localPath || (() => {
        aliasKeys.push(index)
        delete returnObject[index]
      })()
      // localPath && l(aliasName, returnObject[aliasName])()
    })()
  })

  Object.keys(returnObject).forEach(key => {
    (localPath && !aliasKeys.includes(name)) && (() => {
      returnObject[camelCase(arrayDsl(key.split('/')).last())] = returnObject[name]
      delete returnObject[name]
    })()
  })
}
