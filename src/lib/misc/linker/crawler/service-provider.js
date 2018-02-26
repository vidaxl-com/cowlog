const unique = require('array-unique')
const sha256 = require('sha256')
const objectHash = require('object-hash')
module.exports = exports = function (crawlerData, hash = null) {
  let serviceMap = {}
  let serviceParametersMap = {}

  crawlerData.forEach(function (data) {
    let entries = data.entries
    entries.forEach(function (entry) {
      let parameters = entry.parameters
      let lastParameter = parameters[parameters.length - 1]
      if (parameters.length >= 2 && lastParameter === 'begin') {
        let extractedParameters = parameters.slice(0, (parameters.length - 2)).join(' ')
        if (extractedParameters) {
          let firstParameter = parameters[0]
          let serviceParameters = parameters.slice(1, parameters.length - 1).join(' ')
          let arr = serviceParametersMap[firstParameter]
          if (!arr) {
            arr = serviceParametersMap[firstParameter] = []
          }
          arr.push(serviceParameters)
          serviceMap[firstParameter] = arr
        }
      }
    })
  })
  let currentHash = sha256(objectHash(serviceMap))
  Object.keys(serviceMap).forEach(function (key) {
    serviceMap[key] = unique(serviceMap[key])
  })
  if (currentHash !== hash) {
    exports(crawlerData, currentHash)
  }
  l(serviceMap)
}
