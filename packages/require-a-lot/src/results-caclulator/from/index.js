module.exports = (secondArguments, requireModuleInstance, noPackageInfo,infoList, info,from, alias) =>
  Array.from(secondArguments).map(libraryToRequire => (() => {
  const name = libraryToRequire
  const infoListIndex = libraryToRequire
  const loclalPath = libraryToRequire.includes('.')
  const lokalPackageName = name.slice(name.lastIndexOf('/') + 1, name.last)
  // This lot of parameters looks weird, but in this case I found it the best to have small files
  require('./text-outputs/local-path-related')
           (loclalPath,noPackageInfo,infoList,name, info, infoListIndex, from, alias,lokalPackageName, libraryToRequire)

const returnObject = {}
  require('./return-object-assembly/local-path-related')(loclalPath,returnObject,lokalPackageName,requireModuleInstance,
                                                                                                  libraryToRequire,name)
  require('./return-object-assembly/alias')(alias,returnObject,name,loclalPath,lokalPackageName)
  require('./return-object-assembly/from')(from,returnObject,name)

  return returnObject
})())
