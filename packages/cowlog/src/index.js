'use strict'
const merge = require('merge')
const configParser = require('./app/configParser/configParser')

module.exports = exports = function (defaultParametersToken) {
  defaultParametersToken = defaultParametersToken || 'default'
  const appContainer =
        require('./app/container')(merge.recursive(true, configParser('default'), configParser(defaultParametersToken)))

  return appContainer.cowlog()
}
