const camelCase = require('camelcase')
const { getInstalledPathSync } = require('get-installed-path')
const path = require('path')

module.exports = (requireModuleInstance, parameters, secondArguments) => (results = {}, infoList = []) => {
  const noPackageInfo = []
  const alias = parameters.arguments('alias', 'allEntries', [])
  const from = parameters.arguments('from', 'allEntries', [[[]]])
  const info = parameters.command.has('info')

  Array.from(secondArguments).map(libraryToRequire => (() => {
    let name = libraryToRequire
    let infoListIndex = libraryToRequire
    const loclalPath = libraryToRequire.includes('.')
    const lokalPackageName = name.slice(name.lastIndexOf('/') + 1, name.last)
    if (loclalPath) {
      noPackageInfo.push(name)
      infoList[camelCase(lokalPackageName)] = `//reative path: ${libraryToRequire}`
    }
    if (!loclalPath) {
      let filePath = ''
      let probablyNodeModule = false
      try{
        filePath = path.join(path.join(getInstalledPathSync(name, { local: true }), 'package.json'))
      }catch (e) {
        probablyNodeModule = true
      }
      if(probablyNodeModule){
        noPackageInfo.push(name)
        infoList[name] = `//node module: ${libraryToRequire}`
      }
      let infoData = ''
      if(!probablyNodeModule){
        const pi = require(filePath)
        let homepage = pi.homepage
        let description = pi.description
        homepage = homepage ? `${homepage}` : 'no homepage'
        description = description ? `${description}` : 'no description'
        infoData = info ? `${pi.name}@${pi.version} | ${homepage} | ${description}` : ''
        infoList[infoListIndex] = info ? `//` + infoData : ''
      }

      from.forEach(fromLibrary => {
        const libraryTags = fromLibrary[1]
        const originalLibraryName = fromLibrary[0]
        if (originalLibraryName === name) {
          infoList[libraryTags] = info ? `//*tag* of ${name} | ${infoData}` : ''
        }
      })

      alias.forEach(alias => {
        const originalLibraryName = alias[0]
        const aliasName = alias[1]
        if (aliasName && originalLibraryName === name) {
          infoList[aliasName] = info ? `//*alias* of ${name} | ${infoData}` : ''
        }
      })
    }
    const obj = {}
    if (!loclalPath) {
      obj[camelCase(name)] = requireModuleInstance(libraryToRequire)
    }
    if (loclalPath) {
      obj[camelCase(lokalPackageName)] = requireModuleInstance(libraryToRequire)
    }
    alias.forEach(alias => {
      const originalLibraryName = alias[0]
      const aliasName = alias[1]
      const realIndex = loclalPath ? lokalPackageName : name
      const index = camelCase(realIndex)
      if (originalLibraryName === realIndex) {
        obj[aliasName] = obj[index]
        delete obj[index]
      }
    })

    from.forEach(fromLibrary => {
      const libraryTags = fromLibrary[1]
      const originalLibraryName = fromLibrary[0]

      if (originalLibraryName && name === originalLibraryName && libraryTags && Array.isArray(libraryTags)) {
        libraryTags.forEach(tag => { obj[tag] = obj[name][tag] })
      }
    })

    return obj
  })())
    .forEach(partialResult => {
      results = Object.assign(results, partialResult)
    })

  parameters.arguments('hide', 'allEntries', [[]]).forEach((row) => row.forEach(item => {
    delete results[item]
  }))

  return ({ results, noPackageInfo, infoList })
}
