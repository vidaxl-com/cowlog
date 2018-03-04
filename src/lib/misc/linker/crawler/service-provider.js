const unique = require('array-unique')
const sha256 = require('sha256')
const objectHash = require('object-hash')
const objectPath = require('object-path')
const flatten = require('flat')

module.exports = exports = function (projectRoot, metaData = {}) {
  let crawlerData = require('./crawler')(projectRoot)
  let newMetaData = exports.hashIt(exports.extractData(crawlerData))
  let oldHashes = metaData['hashes']
  let newHashes = newMetaData['hashes']
  // let oldServiceMapHash = objectPath(crawlerData, 'metaData.serviceMap')

  let returnValue = ''

  if (!oldHashes || oldHashes.all !== newHashes.all) {
    returnValue = exports(projectRoot, newMetaData)
  }
  else {
    returnValue = newMetaData
  }

  return returnValue
}

exports.hashIt = function (data) {
  let keys = Object.keys(data)
  let hashes = {}
  keys.forEach(function (key) {
    let subDataValue = data[key];
    hashes[key] = objectHash(subDataValue)
  })
  let all = ''
  Object.keys(hashes).forEach(function (key) {
    all += hashes[key]
  })
  all = sha256(all)
  hashes.all = all

  return {data, hashes}
}

exports.extractData = function (crawlerData) {
  let serviceMap = {}
  let serviceDelimiterMap = {}

  crawlerData.forEach(function (data) {
    let entries = data.entries
    entries.forEach(function (entry) {
      let parameters = entry.parameters
      // Check the begin and the end tag opener and closer.
      let lastParameter = parameters[parameters.length - 1]
      if (parameters.length >= 2 && lastParameter === 'begin') {
        let extractedParameters = parameters.slice(0, (parameters.length - 2)).join(' ')
        if (extractedParameters) {
          let firstParameter = parameters[0]
          let serviceParameters = parameters.slice(1, parameters.length - 1).join(' ')
          let arr = serviceDelimiterMap[firstParameter]
          if (!arr) {
            arr = serviceDelimiterMap[firstParameter] = []
          }
          arr.push(serviceParameters)
          serviceMap[firstParameter] = arr
        }
      }
    })
  })

  return {serviceMap, serviceDelimiterMap, }
}

module.get = function(data){
}
