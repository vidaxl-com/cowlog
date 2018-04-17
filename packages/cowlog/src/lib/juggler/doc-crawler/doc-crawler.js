let {linkerDir} = require('generic-text-linker')
let supportedFileTypes = require('..//crawler/supported-file-types')

module.exports = exports = function (projectRoot) {
  return require('../crawler/rendering-engine')(projectRoot, function (newMetaData) {
    let serviceMap = newMetaData.data.serviceMap
    serviceMap.source.forEach(function (srcItem) {
      if (serviceMap.destination && serviceMap.destination.includes(srcItem)) {
        Object.keys(supportedFileTypes).forEach(function (fileType) {
          let sourceTags = supportedFileTypes[fileType].tagsFactory(`source ${srcItem}`, fileType)
          let destinationTags = supportedFileTypes[fileType].tagsFactory(`destination ${srcItem}`, fileType)
          let sourceData = linkerDir(projectRoot, sourceTags.begin, sourceTags.end)
          linkerDir(projectRoot, destinationTags.begin, destinationTags.end, sourceData)
        })
      }
    })
  })
}

