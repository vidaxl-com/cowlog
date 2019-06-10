module.exports = (ralContainer) => {

  return Array.from(ralContainer.dependentLibraries).map(libraryToRequire => (() => {
    const nameOrPathOfModule = libraryToRequire
    const localPath = libraryToRequire.includes('.')
    const localPackageName = libraryToRequire.slice(libraryToRequire.lastIndexOf('/') + 1, libraryToRequire.last)
    require('./text-outputs/local-path-related')(ralContainer, localPath, localPackageName, libraryToRequire)

    const returnObject = {}
    require('./local-path-related')(ralContainer, localPath, returnObject, localPackageName, libraryToRequire,
      nameOrPathOfModule)

    require('./alias')(ralContainer, returnObject, nameOrPathOfModule, localPath, localPackageName)
    require('./from')(ralContainer, returnObject, nameOrPathOfModule)

    return returnObject
  })())

}
