module.exports = (alias, infoList, info, name, infoData) => alias.forEach(alias => {
  const originalLibraryName = alias[0]
  const aliasName = alias[1]
  aliasName && originalLibraryName === name && (()=>{
    infoList[aliasName] = info ? `//*alias* of ${name} | ${infoData}` : ''
  })()
})
