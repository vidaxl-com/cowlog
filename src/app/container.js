'use strict'
/**
 * @returns {{}} application container
 */
const os = require('os')
const path = require('path')

const tmpDir = os.tmpdir()
const cowlogTmpDir = path.join(tmpDir, 'cowlog/')
const cowlogHashDir = path.join(cowlogTmpDir, 'hashes/')

module.exports = (function () {
  let Bottle = require('bottlejs')

  let bottle = new Bottle('cowlog')
  let applicationContainer = bottle.container

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

  bottle.service('message-creator', function () {
    return require('../lib/message-creator')()
  })

  bottle.service('calculated-parameters', function (runtimeVariables) {
    return runtimeVariables.calculatedParameters
  }, 'runtime-variables')

  bottle.service('runtime-variables', function (logFileCreator) {
    const hrTime = process.hrtime()
    let sessionLogFile = logFileCreator(hrTime, 'session.log')

    let runtimeVariables = {
      sessionLogFile,
      logs: [],
      fileLogs: {},
      collectedLogs: []
    }

    return runtimeVariables
  }, 'log-file-creator')
  
  // bottle.service('COVERAGE',function (coverage false) {
  //
  // })

  return applicationContainer
}())
