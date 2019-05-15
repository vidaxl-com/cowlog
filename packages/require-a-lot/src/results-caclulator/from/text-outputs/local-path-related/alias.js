module.exports = (ralContainer, name, infoData) => {
  const { parameters, infoList } = ralContainer
  const info = parameters.command.has('info')
  const alias = parameters.arguments('alias', 'allEntries', [[]])

  alias.forEach(alias => {
    const originalLibraryName = alias[0]
    const aliasName = alias[1]
    aliasName && originalLibraryName === name && (() => {
      infoList[aliasName] = info ? { head: `*alias* of ${name}`, infoData }:{}
    })()
  })
}
