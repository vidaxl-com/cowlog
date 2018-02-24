const fileProvider = require('../file-provider')
const fs = require('fs')
// const re = /(^|\n)\s*<--- source .*--->\s*\n/;
const re = /source/;
// const re = /<--- source .*--->/
// const re = /^.*?\b(source)\b.*$/
require('../../../../index')()
const Bottle = require('bottlejs')
/**
 * This function crawls a directory structure sercing for data sources
 */
module.exports = exports = function (dir) {
  let files = fileProvider(dir)
  let collected = []
  files.forEach(function (file) {
    let returnValue = new Bottle(file)
    returnValue.service('path', function () {

      return file
    })
    // let fileMetaData = {}
    let fileContent = fs.readFileSync(file, {encoding: 'utf8'})
    if (fileContent.search(re) >= 0) {
      returnValue.service('path', function () {
        return new String(file)
      })
      const container = returnValue.container
      collected.push(container)
    }
  })
}
