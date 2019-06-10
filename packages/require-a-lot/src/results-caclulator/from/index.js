const arrayDsl = require('array-dsl')
const rrs = require('recursive-readdir-sync')

module.exports = (ralContainer) => {
  let mappedDirs = []
  let parameters = ralContainer.parameters
  const weHaveMappedDirs = parameters.command.has('mapDir')
  if (weHaveMappedDirs) {
    // l(parameters.arguments('mapDir', undefined, []))()
    mappedDirs = arrayDsl((parameters.arguments('mapDir', undefined, []))).flatten()
      .map((dir) => rrs(dir))
      .reduce((acc = [], act) => acc = acc.concat(act))
      .filter((file) => file.endsWith('.js'))
      .map((file) => file.slice(0, -3))
      .map((file) => {
        const deleteWithPath = 'index'
        if (file.endsWith(deleteWithPath)) {
          return file.slice(0, -1 * (deleteWithPath.length + 1))
        }
        return file
      })
  }

  return mappedDirs.concat(Array.from(ralContainer.dependentLibraries)).map(libraryToRequire => (() => {
    // l(libraryToRequire)()
    const nameOrPathOfModule = libraryToRequire
    const localPath = libraryToRequire.includes('.') || libraryToRequire.startsWith('/')
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
