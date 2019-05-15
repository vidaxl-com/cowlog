const arrayDsl = require('array-dsl')
module.exports = (ralContainer, returnObject, name) => {
  const { parameters } = ralContainer
  const from = parameters.arguments('from', 'allEntries', [[]])

  from.forEach(fromLibrary => {
    const libraryTags = arrayDsl(fromLibrary[1]).arrify()
    const originalLibraryName = fromLibrary[0]
    originalLibraryName && name === originalLibraryName && libraryTags && Array.isArray(libraryTags) && (() =>
      libraryTags.forEach(tag => { returnObject[tag] = returnObject[name][tag] })
    )()
  })
}
