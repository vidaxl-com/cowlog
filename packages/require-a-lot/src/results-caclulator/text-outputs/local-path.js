const camelCase = require('camelcase')
const { getInstalledPathSync } = require('get-installed-path')
const path = require('path')

module.exports = (loclalPath, noPackageInfo, infoList, lokalPackageName, name, libraryToRequire)=>
  loclalPath && (()=>{
  noPackageInfo.push(name)
  infoList[camelCase(lokalPackageName)] = `//reative path: ${libraryToRequire}`
})()
