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

  bottle.service('cowlog', function (logger, messageCreator, runtimeVariables) {
    return require('../cowlog')(logger, messageCreator, runtimeVariables)
  }, 'logger', 'message-creator', 'runtime-variables')

  bottle.service('logger', function (messageCreator, hashCreator, logFileCreator, runtimeVariables) {
    return require('../lib/logger')(messageCreator, hashCreator, logFileCreator, runtimeVariables)
  }, 'message-creator', 'hash-creator', 'log-file-creator', 'runtime-variables')

  bottle.service('message-creator', function (runtimeVariables) {
    return require('../lib/message-creator')(runtimeVariables)
  }, 'runtime-variables')

  bottle.service('runtime-variables', function (logFileCreator) {
    const hrTime = process.hrtime()
    let sessionLogFile = logFileCreator(hrTime, 'session.log')

    let runtimeVariables = {
      sessionLogFile,
      logs: [],
      fileLogs: {},
      collectedLogs: [],
      calculatedParameters: require('../app/configParser')(/*parameters*/)
    }

    return runtimeVariables
  }, 'log-file-creator')

  return applicationContainer
}())
