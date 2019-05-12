module.exports = (dependenctLibraries, requireModuleInstance, noPackageInfo, infoList, info, from, alias, information) => {
  return Array.from(dependenctLibraries).map(libraryToRequire => (() => {
    const nameOrPath = libraryToRequire
    const infoListIndex = libraryToRequire
    const loclalPath = libraryToRequire.includes('.')
    //todo: remove this duplicatied functinality
    const lokalPackageName = nameOrPath.slice(nameOrPath.lastIndexOf('/') + 1, nameOrPath.last)
    // This lot of parameters looks weird, but in this case I found it the best to have small files
    require('./text-outputs/local-path-related')(loclalPath, noPackageInfo, infoList, nameOrPath, info,
      infoListIndex, from, alias, lokalPackageName, libraryToRequire, information)

    const returnObject = {}
    require('./local-path-related')(loclalPath, returnObject, lokalPackageName,
      requireModuleInstance, libraryToRequire, nameOrPath)

    //todo: fix localPackageName and name.
    require('./alias')(alias, returnObject, nameOrPath, loclalPath, lokalPackageName)
    require('./from')(from, returnObject, nameOrPath)

    return returnObject
  })())

}
