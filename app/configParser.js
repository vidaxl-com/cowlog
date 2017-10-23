const isString = require('is-string')
const isObject = require('is-object')
const merge = require('merge')

module.exports = function (parameters) {
  let defaultParameters = require('./configs/default')

  if (!parameters) {
    parameters = defaultParameters
  }

  if (isString(parameters)) {
    if (parameters === 'boring') {
      parameters = require('./configs/boring')
    }
    if (parameters === 'plain') {
      parameters = require('./configs/plain')
    }
    if (isString(parameters)) {
      parameters = defaultParameters
    }
  }

  if (isObject(parameters) && !parameters.preset) {
    parameters = merge(defaultParameters, parameters)
  }

  parameters = parameters || {}
  return parameters
}
