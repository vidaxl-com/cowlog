module.exports = (ralContainer, localPath, localPackageName, libraryToRequire) => {
  require('./local-path')(ralContainer, localPath, libraryToRequire, localPackageName, libraryToRequire)
  require('./not-local-path')(ralContainer, localPath, libraryToRequire, libraryToRequire, libraryToRequire)
}
