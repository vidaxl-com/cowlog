'use strict'
module.exports = (function (parameters) {
  const appContainer = require('./app/container')

  return appContainer.cowlog(parameters)
})()
