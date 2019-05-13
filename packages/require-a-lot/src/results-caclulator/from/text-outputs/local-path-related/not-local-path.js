const {getInstalledPathSync} = require('get-installed-path')
const path = require('path')
const camelCase = require('camelcase')

module.exports = (loclalPath, noPackageInfo, infoList, name, info, infoListIndex, from, alias, libraryToRequire) =>
  loclalPath || (() => {
    let filePath = ''
    let probablyNodeModule = false
    try {
      filePath = path.join(path.join(getInstalledPathSync(name, {local: true}), 'package.json'))
    } catch (e) {
      probablyNodeModule = true
    }
    probablyNodeModule && (() => {
      const camelCaseName = camelCase(name)
      // noPackageInfo.push(name)
      infoList[camelCaseName] = {
        head: `*node module*: ${libraryToRequire}`,
        homepage: `https://nodejs.org/api/${camelCaseName}.html`
      }
    })()
    let infoData = ''

    probablyNodeModule || (() => {
      const module = require(filePath)
      let homepage = module.homepage
      let description = module.description
      homepage = homepage ? `${homepage}` : 'no homepage'
      description = description ? `${description}` : 'no description'
      infoData = info ? `${module.name}@${module.version} | ${homepage} | ${description}` : ''
      infoList[camelCase(infoListIndex)] = {head: `${module.name}@${module.version}`, homepage, description}
    })()

    require('../from')(from, name, infoData, infoList, info)
    require('../alias')(alias, infoList, info, name, infoData)
  })()

