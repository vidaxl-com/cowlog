module.exports = (ralContainer, loclalPath, lokalPackageName, libraryToRequire) => {
  require('./local-path')(ralContainer, loclalPath, libraryToRequire, lokalPackageName, libraryToRequire)
  require('./not-local-path')(ralContainer, loclalPath, libraryToRequire, libraryToRequire, libraryToRequire)
}
