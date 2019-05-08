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

    require('./text-outputs/local-path')(loclalPath, noPackageInfo, infoList, lokalPackageName, name, libraryToRequire)

    loclalPath || (()=>{
      let filePath = ''
      let probablyNodeModule = false
      try{
        filePath = path.join(path.join(getInstalledPathSync(name, { local: true }), 'package.json'))
      }catch (e) {
        probablyNodeModule = true
      }
      probablyNodeModule && (()=>{
        noPackageInfo.push(name)
        infoList[name] = `//node module: ${libraryToRequire}`
      })()
      let infoData = ''

      probablyNodeModule || (()=>{
        const module = require(filePath)
        let homepage = module.homepage
        let description = module.description
        homepage = homepage ? `${homepage}` : 'no homepage'
        description = description ? `${description}` : 'no description'
        infoData = info ? `${module.name}@${module.version} | ${homepage} | ${description}` : ''
        infoList[infoListIndex] = info ? `//` + infoData : ''
      })()

      require('./text-outputs/from')(from, name, infoData, infoList, info)
      require('./text-outputs/alias')(alias, infoList, info, name, infoData)
    })()


    const obj = {}
    loclalPath && (()=>{
      obj[camelCase(lokalPackageName)] = requireModuleInstance(libraryToRequire)
    })()
    loclalPath || (()=>{
      obj[camelCase(name)] = requireModuleInstance(libraryToRequire)
    })()
    alias.forEach(alias => {
      const originalLibraryName = alias[0]
      const aliasName = alias[1]
      const realIndex = loclalPath ? lokalPackageName : name
      const index = camelCase(realIndex)
      originalLibraryName === realIndex && (()=>{
        obj[aliasName] = obj[index]
        delete obj[index]
      })()
    })
    from.forEach(fromLibrary => {
      const libraryTags = fromLibrary[1]
      const originalLibraryName = fromLibrary[0]

      originalLibraryName && name === originalLibraryName && libraryTags && Array.isArray(libraryTags) && (()=>
          libraryTags.forEach(tag => { obj[tag] = obj[name][tag] })
      )()
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
