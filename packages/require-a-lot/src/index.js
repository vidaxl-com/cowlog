const camelCase = require('camelcase')
const { getInstalledPathSync } = require('get-installed-path')
const path = require('path')

module.exports = (requireModuleInstance) => function () {
  const secondArguments = arguments
  // l(secondArguments)()
  return require('dsl-framework').noPromises()(
    (e, d) => {
      let results = {}
      let noPackageInfo = []
      let infoList = {}
      const alias = d.arguments('alias', 'allEntries', [[]])
      let from = d.arguments('from', 'allEntries', [[[]]])
      const info = d.command.has('info')

      Array.from(secondArguments).map(argument => (() => {
        let name = argument
        const localpackage = name.includes('/')
        if (localpackage) {
          name = name.slice(name.lastIndexOf('/') + 1, name.last)
          noPackageInfo.push(name)
          infoList[`prefix_${name}`] = `reative path: ${argument}`
        }
        if (!localpackage) {
          const pi = require(path.join(path.join(getInstalledPathSync(name, { local: true }), 'package.json')))
          let homepage = pi.homepage
          let description = pi.description
          homepage = homepage ? `homepage: ${homepage}` : 'no homepage'
          description = description ? `description: ${description}` : 'no description'
          const infoData = info ? `${pi.name}@${pi.version} (+?) | ${homepage} | ${description}` : ''
          infoList[`prefix_${name}`] = info ? `//` + infoData : ''

          from.forEach(fromLibrary => {
            const libraryTags = fromLibrary[1]
            const originalLibraryName = fromLibrary[0]
            if (originalLibraryName === name) {
              libraryTags.forEach(library => {
                infoList[`prefix_${library}`] = info ? `//tag of ${name} | ${infoData}` : ''
              })
            }
          })
          alias.forEach(alias => {
            const originalLibraryName = alias[0]
            const aliasName = alias[1]
            if (aliasName && originalLibraryName === name) {
              infoList[`prefix_${aliasName}`] = info ? `//alias of ${name} | ${infoData}` : ''
            }
          })
        }
        const obj = {}
        const aliased = []
        alias.forEach(row => {
          if (row.length === 2 && row[0] === name) {
            aliased.push(name)
            obj[row[1]] = requireModuleInstance(argument)
          }
        })
        if (!aliased.includes(name)) {
          obj[camelCase(name)] = requireModuleInstance(argument)
        }

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
        const logType = info ? 'vertical' : d.arguments('log', 'lastArgument', 'horizontal')
        const listDelimiter = ((type) => type === 'vertical' ? '\n' : ' ')(logType)
        const lastLineDelimiter = ((type) => type === 'vertical' ? '' : '/n')(logType)
        let msg = `{${listDelimiter}`
        Object.keys(results).forEach((key) => {
          msg += `  ${key}, ${infoList[`prefix_${key}`] || ''}${listDelimiter}`
        })
        msg += `${lastLineDelimiter}} = `
        console.log(msg)
      }
        : () => {}
      log()
      return results
    }
  )
}
