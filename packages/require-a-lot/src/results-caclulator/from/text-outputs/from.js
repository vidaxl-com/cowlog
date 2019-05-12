module.exports = (from, name, infoData, infoList, info) => from.forEach(fromLibrary => {
  const libraryTags = fromLibrary[1]
  const originalLibraryName = fromLibrary[0]
  originalLibraryName === name && (() => {
    infoList[libraryTags] = info ? { head: `*tag* of ${name}`, infoData } : {}
  })()
})
