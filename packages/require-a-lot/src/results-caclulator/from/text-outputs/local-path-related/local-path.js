const camelCase = require('camelcase')
module.exports = (ralContainer, loclalPath, lokalPackageName, name, libraryToRequire) => {
  const { infoList } = ralContainer

  loclalPath && (() => {
    infoList[camelCase(name)] = { head: `*file path*: ${libraryToRequire}` }
  })()
}
