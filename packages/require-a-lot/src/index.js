const camelCase = require('camelcase')
const { getInstalledPathSync } = require('get-installed-path')
const path = require('path')
const { linkerDir } = require('generic-text-linker')
module.exports = (requireModuleInstance) => function () {
  const secondArguments = arguments
  return require('dsl-framework').noPromises()(
    (e, d) => {
      let results = {}
      const noPackageInfo = []
      const infoList = {}
      const alias = d.arguments('alias', 'allEntries', [])
      const from = d.arguments('from', 'allEntries', [[[]]])
      const tag = d.arguments('tag', 'lastArgument')
      const linkDirectory = d.arguments('linkDirectory', 'lastArgument')
      const info = d.command.has('info')
      const maxLineWidth = d.arguments('maxLineWidth', 'lastArgument', 120)
      // let directoryUsedFrom = d.arguments('directoryUsedFrom', 'lastArgument')
      // directoryUsedFrom = directoryUsedFrom?require('pkg-dir').sync(directoryUsedFrom):false

      Array.from(secondArguments).map(argument => (() => {
        let name = argument
        let infoListIndex = argument
        const localpackage = argument.includes('.')
        const lokalPackageName = name.slice(name.lastIndexOf('/') + 1, name.last)
        if (localpackage) {
          noPackageInfo.push(name)
          infoList[camelCase(lokalPackageName)] = `//reative path: ${argument}`
        }
        if (!localpackage) {
          // infoListIndex = `${name}`
          const pi = require(path.join(path.join(getInstalledPathSync(name, { local: true }), 'package.json')))
          let homepage = pi.homepage
          let description = pi.description
          homepage = homepage ? `${homepage}` : 'no homepage'
          description = description ? `${description}` : 'no description'
          const infoData = info ? `${pi.name}@${pi.version} | ${homepage} | ${description}` : ''
          infoList[infoListIndex] = info ? `//` + infoData : ''

          from.forEach(fromLibrary => {
            const libraryTags = fromLibrary[1]
            const originalLibraryName = fromLibrary[0]
            if (originalLibraryName === name) {
              libraryTags.forEach(library => {
                infoList[libraryTags] = info ? `//*tag* of ${name} | ${infoData}` : ''
              })
            }
          })

          alias.forEach(alias => {
            const originalLibraryName = alias[0]
            const aliasName = alias[1]
            if (aliasName && originalLibraryName === name) {
              infoList[aliasName] = info ? `//*alias* of ${name} | ${infoData}` : ''
            }
          })
        }
        const obj = {}
        if (!localpackage) {
          obj[camelCase(name)] = requireModuleInstance(argument)
        }
        if (localpackage) {
          obj[camelCase(lokalPackageName)] = requireModuleInstance(argument)
        }
        alias.forEach(alias => {
          const originalLibraryName = alias[0]
          const aliasName = alias[1]
          const realIndex = localpackage ? lokalPackageName : name
          const index = camelCase(realIndex)
          if (originalLibraryName === realIndex) {
            obj[aliasName] = obj[index]
            delete obj[index]
          }
        })

        from.forEach(fromLibrary => {
          const libraryTags = fromLibrary[1]
          const originalLibraryName = fromLibrary[0]

          if (originalLibraryName && name === originalLibraryName && libraryTags && Array.isArray(libraryTags)) {
            libraryTags.forEach(tag => { obj[tag] = obj[name][tag] })
          }
        })

        return obj
      })())
        .forEach(partialResult => {
          results = Object.assign(results, partialResult)
        })

      d.arguments('hide', 'allEntries', [[]]).forEach((row) => row.forEach(item => {
        delete results[item]
      }))

      let log = d.command.has('log') ? () => {
        const tagCommon = tag ? `// [require-a-lot] ${tag}` : ''
        const begin = `${tagCommon} begin`
        const end = `${tagCommon} end`
        const tagOpen = tag ? `${begin}\n` : ''
        const tagEnd = tag ? `\n${end}` : ''
        const tagEqual = tag ? '\n=' : ''
        const noTagEqual = tag ? '' : '='

        const logType = info || tag ? 'vertical' : d.arguments('log', 'lastArgument', 'horizontal')
        const listDelimiter = ((type) => type === 'vertical' ? '\n' : ' ')(logType)
        const lastLineDelimiter = ((type) => type === 'vertical' ? '' : '/n')(logType)
        let msg = `const {${listDelimiter}`
        Object.keys(results).forEach((key) => {
          msg += `  ${key}, ${infoList[`${key}`] || ''}${listDelimiter}`
        })
        msg += `${lastLineDelimiter}} ${noTagEqual} `
        msg = msg.split('\n').map(line => {
          if (line.length > maxLineWidth) {
            const tooLong = '...'
            return line.slice(0, maxLineWidth - tooLong.length) + tooLong
          } else {
            return line
          }
        }).join('\n')
        const consoleMessage = tagOpen + msg + tagEnd + tagEqual
        console.log(consoleMessage)
        const originalContent = linkerDir(linkDirectory, begin, end)
        const emptySpaces = originalContent ? (() => {
          const originialFirstLine = originalContent.split('\n')[0]
          const trimmedOne = originialFirstLine.trim()
          return new Array(originialFirstLine.length - trimmedOne.length + 1).join(' ')
        })() : ''
        linkerDir(linkDirectory, begin, end, msg.split('\n').map(line => emptySpaces + line).join('\n'))
      }
        : () => {}
      log()
      return results
    }
  )
}
