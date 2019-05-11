const { getInstalledPathSync } = require('get-installed-path')
const path = require('path')
const camelCase = require('camelcase')

module.exports = (loclalPath, noPackageInfo, infoList, name, info, infoListIndex, from, alias, libraryToRequire) =>
  loclalPath || (() => {
    let filePath = ''
    let probablyNodeModule = false
    try {
      filePath = path.join(path.join(getInstalledPathSync(name, { local: true }), 'package.json'))
    } catch (e) {
      probablyNodeModule = true
    }
    probablyNodeModule && (() => {
      // noPackageInfo.push(name)
      infoList[camelCase(name)] = `// node module: ${libraryToRequire}`
    })()
    let infoData = ''

    probablyNodeModule || (() => {
      const module = require(filePath)
      let homepage = module.homepage
      let description = module.description
      homepage = homepage ? `${homepage}` : 'no homepage'
      description = description ? `${description}` : 'no description'
      infoData = info ? `${module.name}@${module.version} | ${homepage} | ${description}` : ''
      infoList[camelCase(infoListIndex)] = info ? `// ` + infoData : ''
    })()

    require('../from')(from, name, infoData, infoList, info)
    require('../alias')(alias, infoList, info, name, infoData)
  })()

