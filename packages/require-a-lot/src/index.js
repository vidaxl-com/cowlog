const camelCase = require('camelcase')

module.exports = (requireModuleInstance) => function () {
  const secondArguments = arguments
  // l(secondArguments)()
  return require('dsl-framework').noPromises()(
    (e, d) => {
      let results = {}
      Array.from(secondArguments).map(argument => (() => {
        let name = argument
        if (name.includes('/')) {
          name = name.slice(name.lastIndexOf('/') + 1, name.last)
        }
        let obj = {}
        let alias = d.arguments('alias', 'allEntries', [])
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

        return obj
      })())
        .forEach(result => {
          const key = Object.keys(result)[0]
          results[key] = result[key]
        })
      // l(results).keys()
      let log = d.command.has('log') ? () => {
        const logType = d.arguments('log', 'lastArgument', 'horizontal')
        const listDelimiter = ((type) => type === 'vertical' ? '\n' : ' ')(logType)
        const lastLineDelimiter = ((type) => type === 'vertical' ? '' : '/n')(logType)
        let msg = `{${listDelimiter}`
        Object.keys(results).forEach((key) => {
          msg += `  ${key},${listDelimiter}`
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
