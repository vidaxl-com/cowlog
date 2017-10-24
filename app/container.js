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

  bottle.service('cowlog', function (logFileCreator) {
    let cowlog = require('../cowlog')(logFileCreator)

    return cowlog
  }, 'log-file-creator')

  return applicationContainer
}())
