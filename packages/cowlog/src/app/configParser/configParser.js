const isString = require('is-string')

module.exports = exports = function (parameters) {
  let defaultParameters = module.parameterRequest(parameters)

  return defaultParameters
}

module.parameterRequest = function (requestEntity) {
  if (isString(requestEntity)) {
    requestEntity = require(`../configs/${requestEntity}`)
  }

  return requestEntity
}
