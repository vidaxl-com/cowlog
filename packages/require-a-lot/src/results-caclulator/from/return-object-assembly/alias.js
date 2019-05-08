const camelCase = require('camelcase')

module.exports = (alias,returnObject,name,loclalPath,lokalPackageName) => {
  alias.forEach(alias => {
    const originalLibraryName = alias[0]
    const aliasName = alias[1]
    const realIndex = loclalPath ? lokalPackageName : name
    const index = camelCase(realIndex)
    originalLibraryName === realIndex && (()=>{
      returnObject[aliasName] = returnObject[index]
      delete returnObject[index]
    })()
  })
}
