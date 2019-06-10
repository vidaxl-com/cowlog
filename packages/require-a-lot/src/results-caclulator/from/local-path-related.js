const camelCase = require('camelcase')

module.exports = (ralContainer, localPath, returnObject, localPackageName, libraryToRequire, name) => {
  const { requireModuleInstance } = ralContainer
  localPath && (() => {
    // l("AAAA", libraryToRequire, localPackageName, camelCase(name))()
    returnObject[name] = requireModuleInstance(libraryToRequire)
  })()
  localPath || (() => { returnObject[camelCase(name)] = requireModuleInstance(libraryToRequire) })()
}
