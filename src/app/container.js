'use strict'
/**
 * @returns {{}} application container
 */
const os = require('os')
const path = require('path')

const tmpDir = os.tmpdir()
const cowlogTmpDir = path.join(tmpDir, 'cowlog/')
const cowlogHashDir = path.join(cowlogTmpDir, 'hashes/')
var events = require('events')

module.exports = (function () {
  let Bottle = require('bottlejs')

  let bottle = new Bottle('cowlog')
  let applicationContainer = bottle.container

  bottle.service('dictionary', function () {
    return require('./dictionary')
  })

  bottle.factory('event-emitter',function (container) {
    let eventEmitter = new events.EventEmitter()
    return eventEmitter
  })

  bottle.factory('logger-body-factory', function (container) {
    return require('../lib/logger/body-factory')(container)
  })

  bottle.service('hash-creator', function () {
    return require('../lib/hash-creator')()
  })

  bottle.service('log-file-creator', function () {
    return require('../lib/logfile-creator')(cowlogHashDir)
  })

  bottle.factory('cowlog', function (container) {
    return require('../lib/cowlog')(container)
  }, 'logger', 'message-creator', 'runtime-variables')

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

  bottle.service('calculated-parameters', function (runtimeVariables) {
    return runtimeVariables.calculatedParameters
  }, 'runtime-variables')

  bottle.service('runtime-variables', function (logFileCreator) {
    const hrTime = process.hrtime()
    let sessionLogFile = logFileCreator(hrTime, 'session.log')

    let runtimeVariables = {
      env:{
        ci: !!process.env.CI,
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
    return require('../lib/plugin-loader')(container)
  })

  applicationContainer['plugin-loader'](require('../plugins/logDetails'))

  return applicationContainer
}())
