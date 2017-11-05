const isString = require('is-string')
const isObject = require('is-object')
const merge = require('merge')

module.exports = exports = function (parameters) {
  let defaultParameters = module.parameterRequest('default')

  return defaultParameters
}

module.parameterRequest = function (requestEntity) {
  if (isString(requestEntity)) {
    requestEntity = require(`../configs/${requestEntity}`)
  }

  return requestEntity
}
