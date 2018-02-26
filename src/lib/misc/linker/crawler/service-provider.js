const unique = require('array-unique')
const objectHash = require('object-hash')
const objectPath = require('object-path')
const sha256 = require('sha256')

module.exports = exports = function (crawlerData, result = null) {
  let hashes = module.getHash(result)

  let serviceMap = {}
  let serviceParametersMap = {}
  let fullDataTree = {}

  crawlerData.forEach(function (data) {
    let entries = data.entries
    entries.forEach(function (entry) {
      objectPath.set(fullDataTree, entry.parameters.join('.'), true)
      let parameters = entry.parameters
      let lastParameter = parameters[parameters.length - 1]
      if (parameters.length >= 2 && lastParameter === 'begin') {
        let extractedParameters = parameters.slice(0, (parameters.length - 2)).join(' ')
        if (extractedParameters) {
          let categoryName = parameters[0]

          let serviceParameters = parameters.slice(1, parameters.length - 1).join(' ')
          //services
          let serviceArray = serviceParametersMap[categoryName]
          let serviceDelimiterArray = serviceParametersMap[categoryName]

          if (!serviceArray) {
            serviceArray = serviceParametersMap[categoryName] = []

          }
          serviceArray.push(serviceParameters)
          serviceMap[categoryName] = serviceArray

          //serviceDelimiters
          // if(objectPath.has(serviceDelimiterMap))
          // if(serviceDelimiterMap)
          // let arr = serviceParametersMap[categoryName]
          // if (!arr) {
          //   arr = serviceParametersMap[categoryName] = []
          // }
          // arr.push(serviceParameters)
          // serviceMap[categoryName] = arr

        }
      }
    })
  })

  let servicesContainer = {}
  Object.keys(serviceMap).forEach(function (key) {
    servicesContainer[key] = unique(serviceMap[key])
  })

  let services = {
    fullDataTree: fullDataTree,
    services: servicesContainer,
    'services.delimiters':{}
  }
  let currentHashes = module.getHash(services)

  if (currentHashes.services !== hashes.services) {
    exports(crawlerData, services)

    return null
  }
  l(services, currentHashes)
}

module.getHash = function (result) {
  let services = objectHash(objectPath.get(result, 'services') || '')
  let fullDataTree = objectHash(objectPath.get(result, 'FullDataTree') || '')
  if (services && fullDataTree) {
    return {
      services: services,
      fullDataTree: fullDataTree,
      all: sha256(services + fullDataTree)
    }
  }

  return {}
}
