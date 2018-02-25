const fileProvider = require('../file-provider')
const fs = require('fs')
const commentPre = '<!---'
const commentPost = '-->'

const regexAnnotation = new RegExp(`(\\s)*${commentPre} example begin ${commentPost}(\\s)*\\n`) //ok

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
    let startsAt = fileContent.search(regexAnnotation)
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
        if (extension.length < path.length){
          regexSearch.fileExtension = extension
        }
        if (regexSearch.path.path)
          regexSearch.register()
        return regexSearch
      })

      returnValue.factory('fileType', function (container) {
        let regexSearch = container['fileExtension']
        let fileExtension = regexSearch['fileExtension']
        let markdonwFile = fileExtension === 'md' ||
          fileExtension === 'markdown' ||
          fileExtension === 'MD'
        if (
          markdonwFile
        ){
          regexSearch.register('fileType', 'markdown')
        }

        if(!markdonwFile){
          regexSearch.register('fileType', undefined)
        }
        let path = container.path.path
        let pathSplitDot = path.split('.')
        let extension = pathSplitDot[pathSplitDot.length - 1]
        if (extension.length < path.length){
          regexSearch.fileExtension = extension
        }
        if (regexSearch.path.path)
          regexSearch.register()
        return regexSearch
      })

      returnValue.factory('annotationDelimiters', function (container) {
        let regexSearch = container['fileType']
        let fileType = regexSearch['fileType']

        let returnValue = {}
        regexSearch.register('annotationDelimiters', returnValue)

        if (fileType === 'markdown') {
          returnValue.beginning = '<!---'
          returnValue.end = '-->'
        }

        return returnValue
      })

      returnValue.service('string', function () {
        return function () {
          let fileContent = fs.readFileSync(file, {encoding: 'utf8'})

          return fileContent
        }
      })

      returnValue.factory('regexValues', function (container) {
        const annotationDelimiters = container['annotationDelimiters']
        const returnValue = {}
        if (annotationDelimiters.beginning) {
          returnValue.regexLine = new RegExp(
            `(\\s)*${annotationDelimiters.beginning} example begin ${annotationDelimiters.end}(\\s)*\\n`)
          returnValue.regexParameters = new RegExp(
            `${annotationDelimiters.beginning} (.*) ${annotationDelimiters.end}`
          )
        }

        return returnValue
      })

      returnValue.service('regex', function (string, regexSearch, regexValues) {
        let content = string()
        if (!!content && !!regexValues) {
          let reg = content.toString().search(regexValues.regexLine)
          let line =  content.slice(reg, container.length)
            .split('\n')
            .filter(function (n) { return !!n  } )[0]
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
      }, 'string', 'regexSearch', 'regexValues')

      returnValue.factory('init', function (container) {
        container.path
        container.regex
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
      // container.init
      collected.push(container.fileType)
      l(container.regex)('last')
    }
  })
}
