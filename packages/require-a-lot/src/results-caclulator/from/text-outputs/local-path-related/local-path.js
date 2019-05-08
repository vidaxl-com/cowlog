const { getInstalledPathSync } = require('get-installed-path')
const path = require('path')

module.exports = (loclalPath, noPackageInfo, infoList, lokalPackageName, name, libraryToRequire)=>
  loclalPath && (()=>{
  noPackageInfo.push(name)
  infoList[name] = `//reative path: ${libraryToRequire}`
})()
