const unique = require('array-unique')

module.exports = exports = function (crawlerData) {
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

  Object.keys(serviceMap).forEach(function (key) {
    serviceMap[key] = unique(serviceMap[key])
  })
  l(serviceMap)
}
