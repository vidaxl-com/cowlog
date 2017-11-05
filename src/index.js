'use strict'
module.exports = exports = function (parameters) {
  parameters = parameters || 'default'
  let caclculatedParameters = require('./app/configParser/configParser')(parameters)
  const appContainer = require('./app/container')(caclculatedParameters)
  return appContainer.cowlog()
}
