module.exports = (ralContainer, name, infoData) => {
  const { parameters, infoList } = ralContainer
  const info = parameters.command.has('info')
  const from = parameters.arguments('from', 'allEntries', [[]])

  from.forEach(fromLibrary => {
    const libraryTags = fromLibrary[1]
    const originalLibraryName = fromLibrary[0]
    originalLibraryName === name && (() => {
      infoList[libraryTags] = info ? { head: `*tag* of ${name}`, infoData } : {}
    })()
  })
}
