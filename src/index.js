'use strict'
const merge = require('merge')
// const _ = require('lodash')
module.exports = exports = function (defaultParametersToken) {
  defaultParametersToken = defaultParametersToken || 'default'
  let defaultParameters = require('./app/configParser/configParser')('default')
  let clean = require('./app/configParser/configParser')(defaultParametersToken)
  let calculatedParameters = merge.recursive(true, defaultParameters, clean)
  const appContainer = require('./app/container')(calculatedParameters)

  return appContainer.cowlog()
}
