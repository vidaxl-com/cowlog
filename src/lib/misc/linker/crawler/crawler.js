const fileProvider = require('../file-provider')
const fs = require('fs')
const commentPre = '<!---'
const commentPost = '-->'
const regexAnnotation = new RegExp(`(\\s)*${commentPre} example begin ${commentPost}(\\s)*\\n`) //ok
const regexParametersWithinAnnotation = new RegExp(`${commentPre} (.*) ${commentPost}`) //ok

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

      returnValue.service('string', function () {
        return function () {
          let fileContent = fs.readFileSync(file, {encoding: 'utf8'})

          return fileContent
        }
      })

      returnValue.service('regex', function (string, regexSearch) {
        let content = string()
        let reg = content.toString().search(regexAnnotation)
        let line =  content.slice(reg, container.length)
          .split('\n')
          .filter(function (n) { return !!n  } )[0]
          .trim()

        let parametersMatch = line.match(regexParametersWithinAnnotation)

        let parametersAsString = parametersMatch[1]
        if (parametersAsString) {
          regexSearch.register('parameters', parametersAsString.trim().split(' '))
        }
        if (!parametersAsString) {
          regexSearch.register('parameters', [])
        }
        regexSearch.register('line', line)
        regexSearch.register('startsAtChar', reg)

        return regexSearch
      }, 'string', 'regexSearch')

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
      container.init
      collected.push(container)
      // l(container['regexSearch'])
    }
  })
}
