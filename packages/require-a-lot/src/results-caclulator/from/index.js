module.exports = (ralContainer) => {
  const { parameters, dependenctLibraries } = ralContainer

  return Array.from(dependenctLibraries).map(libraryToRequire => (() => {
    const nameOrPathOfModule = libraryToRequire
    const loclalPath = libraryToRequire.includes('.')
    const lokalPackageName = libraryToRequire.slice(libraryToRequire.lastIndexOf('/') + 1, libraryToRequire.last)
    require('./text-outputs/local-path-related')(ralContainer, loclalPath, lokalPackageName, libraryToRequire)

    const returnObject = {}
    require('./local-path-related')(ralContainer, loclalPath, returnObject, lokalPackageName, libraryToRequire,
      nameOrPathOfModule)

    require('./alias')(ralContainer, returnObject, nameOrPathOfModule, loclalPath, lokalPackageName)
    require('./from')(ralContainer, returnObject, nameOrPathOfModule)

    return returnObject
  })())

}
