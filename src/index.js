'use strict'
module.exports = function (parameters) {
  return (function () {
    const appContainer = require('./app/container')
    appContainer['runtime-variables'].calculatedParameters = require('./app/configParser/configParser')(parameters)
    return appContainer.cowlog()
  })()
}
