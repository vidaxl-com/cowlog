const {getInstalledPathSync} = require('get-installed-path')
const path = require('path')
const camelCase = require('camelcase')

module.exports = (ralContainer, localPath, name, infoListIndex, libraryToRequire) => {
  const { parameters, infoList } = ralContainer
  const info = parameters.command.has('info')

  localPath || (() => {
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

    require('./from')(ralContainer, name, infoData)
    require('./alias')(ralContainer, name, infoData)
  })()
}

