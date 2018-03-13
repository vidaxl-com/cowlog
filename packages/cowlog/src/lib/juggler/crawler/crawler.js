const fileProvider = require('../linker/file-provider')
const fs = require('fs')
const supportedFileTypes = require('./supported-file-types')
const mime = require('mime-types')

require('../../../index')()
const Bottle = require('bottlejs')
/**
 * This function crawls a directory structure sercing for data sources
 */
module.exports = exports = function (dir) {
  //todo: make it a parameter
  let files = fileProvider(dir).filter(filePath => !filePath.includes('directory-fixtures'));
  let collected = []

  files.forEach(function (file) {
    let returnValue = new Bottle(file)
    returnValue.service('path', function () {

      return file
    })
    let fileContent = fs.readFileSync(file, {encoding: 'utf8'})

    // Pretty redundant indeed, but it will wait for later fine tuning..
    // Yes it is important because everything has to be pharsed out of all files
    // Before we have a tree about the data.
    Object.keys(supportedFileTypes).concat(Object.keys(supportedFileTypes)).forEach(function (fileType) {
      let fileTypeDetails = supportedFileTypes[fileType]
      if (fileType === mime.lookup(file)) {

        let matches
        let entries = []
        while ((matches = fileTypeDetails.regex.regexGetParamaters.exec(fileContent)) !== null) {
          let char = fileTypeDetails.regex.regexGetParamaters.lastIndex
          let parameters = matches[1].split(' ')
          entries.push({
            matches,
            char,
            parameters
          })
        }
        if (entries.length) {
          returnValue.service('path', function (regexSearch) {
            regexSearch.register('path', file)
            return regexSearch
          }, 'regexSearch')

          returnValue.service('entries', function (regexSearch) {
            regexSearch.register('entries', file)
            return entries
          }, 'regexSearch')

          returnValue.factory('fileExtension', function (container) {
            let regexSearch = container.regexSearch
            let path = container.path.path
            let pathSplitDot = path.split('.')
            let extension = pathSplitDot[pathSplitDot.length - 1]
            if (extension.length < path.length) {
              regexSearch.fileExtension = extension
            }
            return regexSearch
          })

          returnValue.factory('fileType', function (container) {
            let regexSearch = container['fileExtension']
            regexSearch.register('fileType', mime.lookup(container.path.path))
            let path = container.path.path
            let pathSplitDot = path.split('.')
            let extension = pathSplitDot[pathSplitDot.length - 1]
            if (extension.length < path.length) {
              regexSearch.fileExtension = extension
            }

            return regexSearch
          })

          returnValue.service('string', function () {
            return function () {
              let fileContent = fs.readFileSync(file, {encoding: 'utf8'})

              return fileContent
            }
          })

          returnValue.service('regexSearch', function () {
            let me = {}
            me.register = function (name, value) {
              me[name] = value
            }
            me.get = function (name) {
              return me[name]
            }

            return me
          })
          const container = returnValue.container
          collected.push(container)
        }
      }
    })
  })

  return collected
}
