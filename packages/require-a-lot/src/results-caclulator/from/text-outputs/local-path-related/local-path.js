const camelCase = require('camelcase')
module.exports = (ralContainer, localPath, localPackageName, name, libraryToRequire) => {
  const { infoList } = ralContainer

  localPath && (() => {
    infoList[name] = { head: `*file path*: ${libraryToRequire}` }
  })()
}
