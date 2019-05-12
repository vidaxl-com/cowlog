module.exports = (loclalPath, noPackageInfo, infoList, name, info, infoListIndex, from, alias, lokalPackageName,
  libraryToRequire, information) => {
  require('./local-path')(loclalPath, noPackageInfo, infoList, name, lokalPackageName, libraryToRequire)
  require('./not-local-path')(loclalPath, noPackageInfo, infoList, name, info, infoListIndex, from, alias,
    libraryToRequire)
}
