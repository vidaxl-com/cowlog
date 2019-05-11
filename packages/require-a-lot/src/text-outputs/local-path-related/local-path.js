const camelCase = require('camelcase')
module.exports = (loclalPath, noPackageInfo, infoList, lokalPackageName, name, libraryToRequire) =>
  loclalPath && (() => {
    infoList[camelCase(name)] = `// reative path: ${libraryToRequire}`
  })()
