const arrayDsl = require('array-dsl')
module.exports = (from, returnObject, name) => {
  from.forEach(fromLibrary => {
    const libraryTags = arrayDsl(fromLibrary[1]).arrify()
    const originalLibraryName = fromLibrary[0]
    originalLibraryName && name === originalLibraryName && libraryTags && Array.isArray(libraryTags) && (() =>
      libraryTags.forEach(tag => { returnObject[tag] = returnObject[name][tag] })
    )()
  })
}
