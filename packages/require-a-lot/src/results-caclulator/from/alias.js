const camelCase = require('camelcase')
const arrayDsl = require('array-dsl')
module.exports = (aliases, returnObject, name, loclalPath, lokalPackageName) => {
  const aliasKeys = []
  aliases.forEach(alias => {
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
