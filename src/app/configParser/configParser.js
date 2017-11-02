const isString = require('is-string')
const isObject = require('is-object')
const merge = require('merge')

module.exports = exports = function (parameters) {
  let defaultParameters = require('../configs/default')
  if (!parameters) {
    parameters = defaultParameters
  }
  return module.processParameters(parameters)
}

module.processParameters = function (parameters) {
  return module.parameterRequest(parameters)
}

module.parameterRequest = function (requestEntity) {
    if (isString(requestEntity)) {
      requestEntity = require(`../configs/${requestEntity}`)
    }

  return requestEntity
}
