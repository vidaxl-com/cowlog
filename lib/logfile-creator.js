'use strict'

module.exports = function (dir) {
  return function (string, logTypeString) {
    const hashCreator = require('./hash-creator')()
    const path = require('path')
    const fs = require('fs')
    const fsPath = require('fs-path')
    const insertToString = function (str, index, value) {
      return str.substr(0, index) + value + str.substr(index)
    }
    const makeFileNameHashPath = function (string) {
      return insertToString(hashCreator(string), 2, '/')
    }
    const makeHashPath = function (relativeFilePath, logTypeString) {
      if (!logTypeString) {
        logTypeString = '.log'
      }
      return path.join(dir + relativeFilePath) + logTypeString
    }
    let hash = hashCreator(string)
    let relativeFilePath = makeFileNameHashPath(hash)
    let filePath = makeHashPath(relativeFilePath, '_' + logTypeString)
    if (!fs.existsSync(filePath)) {
      fsPath.writeFileSync(filePath, string)
    }

    return filePath
  }
}
