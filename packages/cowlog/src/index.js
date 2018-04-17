'use strict'
const merge = require('merge')
module.exports = exports = function (defaultParametersToken) {
  defaultParametersToken = defaultParametersToken || 'default'
  let defaultParameters = require('./app/configParser/configParser')('default')
  let additionalPlugin = require('./app/configParser/configParser')(defaultParametersToken)
  let calculatedParameters = merge.recursive(true, defaultParameters, additionalPlugin)
  const appContainer = require('./app/container')(calculatedParameters)

  return appContainer.cowlog()
}


