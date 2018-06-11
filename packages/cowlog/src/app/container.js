'use strict'

/**
 * @returns {{}} application container
 */
const os = require('os')
const path = require('path')

const tmpDir = os.tmpdir()
const cowlogTmpDir = path.join(tmpDir, 'cowlog/')
const cowlogHashDir = path.join(cowlogTmpDir, 'hashes/')
const events = require('events')

module.exports = function (calculatedParameters) {
  let Bottle = require('bottlejs')

  let bottle = new Bottle('cowlog')
  let applicationContainer = bottle.container

  bottle.service('calculated-parameters', function (runtimeVariables) {
    runtimeVariables.calculatedParameters = calculatedParameters
    return calculatedParameters
  }, 'runtime-variables')

  bottle.service('environment-dependent', function () {
    let isNode = require('detect-node')
    return {
      isNode
    }
  })

  bottle.service('dictionary', function () {
    return require('./dictionary')
  })

  bottle.factory('event-emitter', function (container) {
    let eventEmitter = new events.EventEmitter()
    return eventEmitter
  })

  bottle.factory('logger-body-factory', function (container) {
    return require('../lib/logger/body-factory')(container)
  })

  bottle.service('hash-creator', function () {
    return require('../lib/hash-creator')
  })

  bottle.service('log-file-creator', function (environmnetDependent) {
    if(environmnetDependent.isNode){
      return require('../lib/logfile-creator')(cowlogHashDir)
    } else {
      return function () {return 'not implemented in browser'}
    }
  },'environment-dependent')

  bottle.factory('cowlog', function (container) {
    let logger = container['logger']
    let messageCreator = container['message-creator']
    let runtimeVariables = container['runtime-variables']
    let dictionary = container.dictionary
    let environmentDependent = container['environment-dependent']
    
    return require('../lib/cowlog')(logger, messageCreator, runtimeVariables, dictionary, environmentDependent)
  })

  bottle.factory('logger', function (container) {
    return require('../lib/logger/logger')(container)
  })

  bottle.factory('logger-print-helpers', function (container) {
    return require('../lib/logger/print-helpers')(container)
  }, 'calculated-parameters')

  bottle.factory('logger-stack-trace-factory', function (container) {
    return require('../lib/logger/stack-trace-factory')(container)
  })

  bottle.factory('message-creator', function (container) {
    return require('../lib/message/message-creator')(container)
  })

  bottle.service('runtime-variables', function (logFileCreator) {
    const hrTime = process.hrtime()
    let sessionLogFile = logFileCreator(hrTime, 'session.log')

    let runtimeVariables = {
      env: {
        prod: !!process.env.PROD
      },
      sessionLogFile,
      logs: [],
      fileLogs: {},
      collectedLogs: []
    }

    return runtimeVariables
  }, 'log-file-creator')

  bottle.service('message-coloring', function () {
    return require('../lib/message/coloring')()
  })

  bottle.factory('plugin-loader', function (container) {
    return require('../lib/plugin/plugin-loader')(container)
  })

  bottle.factory('readmeFileName', function () {
    return ('README.md')
  })

  let plugins = applicationContainer['calculated-parameters'].plugins || []

  plugins.forEach(function (plugin) {
    applicationContainer['plugin-loader'](plugin)
  })

  return applicationContainer
}
