const fileProvider = require('../file-provider')
const fs = require('fs')
const supportedFileTypes = require('./supported-file-types')
const objectPath = require('object-path')
const mime = require('mime-types')

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
    let fileContent = fs.readFileSync(file, {encoding: 'utf8'})

    Object.keys(supportedFileTypes).forEach(function (fileType) {
      let fileTypeDetails = supportedFileTypes[fileType]
      if (fileType === mime.lookup(file)) {
        let startsAt = fileContent.search(fileTypeDetails.regex.regexLine)
        if (startsAt >= 0) {
          returnValue.service('path', function (regexSearch) {
            regexSearch.register('path', file)
            return regexSearch
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

          returnValue.factory('annotationDelimiters', function (container) {
            let regexSearch = container['fileType']
            let fileType = regexSearch['fileType']
            let fileTypeDetails = supportedFileTypes[fileType]

            let returnValue = {}
            let beginning = objectPath.get(fileTypeDetails, 'regex.beginning')
            if (beginning) {
              returnValue = fileTypeDetails.regex
            }
            regexSearch.register('annotationDelimiters', returnValue)

            return returnValue
          })

          returnValue.service('string', function () {
            return function () {
              let fileContent = fs.readFileSync(file, {encoding: 'utf8'})

              return fileContent
            }
          })

          returnValue.service('regex', function (string, regexSearch, regexValues) {
            let content = string()
            if (!!content && !!regexValues) {
              let reg = content.toString().search(regexValues.regexLine)
              let line = content.slice(reg, container.length)
                .split('\n')
                .filter(function (n) { return !!n })[0]
                .trim()
              let parametersMatch = line.match(regexValues.regexParameters)
              let parametersAsString = parametersMatch[1]
              if (parametersAsString) {
                regexSearch.register('parameters', parametersAsString.trim().split(' '))
              }
              if (!parametersAsString) {
                regexSearch.register('parameters', [])
              }
              regexSearch.register('line', line)
              regexSearch.register('startsAtChar', reg)
            }

            return regexSearch
          }, 'string', 'regexSearch', 'annotationDelimiters')

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
          l(container.regex)('last')
        }
      }
    })
  })
}

