const camelCase = require('camelcase')

module.exports = (ralContainer, loclalPath, returnObject, lokalPackageName, libraryToRequire, name) => {
  const { requireModuleInstance } = ralContainer
  loclalPath && (() => { returnObject[name] = requireModuleInstance(libraryToRequire) })()
  loclalPath || (() => { returnObject[camelCase(name)] = requireModuleInstance(libraryToRequire) })()
}
