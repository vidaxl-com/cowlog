const { linkerDir } = require('generic-text-linker')
const { tokenize } = require('esprima')
const fs = require('fs')

const linker = require('./linker')

module.exports = (requireModuleInstance) => function () {
  const secondArguments = arguments
  return require('dsl-framework').noPromises()(
    (e, parameters) => {
      const tag = parameters.arguments('tag', 'lastArgument')
      const linkDirectory = parameters.arguments('linkDirectory', 'lastArgument')
      const info = parameters.command.has('info')
      const maxLineWidth = parameters.arguments('maxLineWidth', 'lastArgument', 120)
      const removeUnused = parameters.command.has('removeUnused')
      // let directoryUsedFrom = d.arguments('directoryUsedFrom', 'lastArgument')
      // directoryUsedFrom = directoryUsedFrom?require('pkg-dir').sync(directoryUsedFrom):false

      const {
        results,
        infoList
      } = require('./resultsCaclulator')(requireModuleInstance, parameters, secondArguments)()

      let log = parameters.command.has('log') ? () => {
        const tagCommon = tag ? `// [require-a-lot] ${tag}` : ''
        const begin = `${tagCommon} begin`
        const end = `${tagCommon} end`
        const tagOpen = tag ? `${begin}\n` : ''
        const tagEnd = tag ? `\n${end}` : ''
        const tagEqual = tag ? '\n=' : ''
        const noTagEqual = tag ? '' : '='

        const logType = info || tag ? 'vertical' : parameters.arguments('log', 'lastArgument', 'horizontal')
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
        const linkerResults = linker(linkDirectory, begin, end, msg, emptySpaces)
        const linkerResultsKeys = linkerResults ? Object.keys(linkerResults) : []
        if (removeUnused) {
          const perFileVariableAllUses = linkerResultsKeys.map(file => {
            const modifiedContent = tokenize(fs.readFileSync(file).toString())
            const tokenizedMsg = tokenize(msg)

            return tokenizedMsg.filter(entry => {
              if (entry.type === 'Identifier') {
                return entry
              }
            }).map(entry => entry.value)
              .map(declaredVariables => modifiedContent.filter(entry => declaredVariables === entry.value))
          })

          const perFileVariables = linkerResultsKeys.map((file, fileIndex) => {
            const fileResults = perFileVariableAllUses[fileIndex]
            const variables = fileResults.map(fileResult => {
              const name = fileResult[0].value
              const used = fileResult.length - 1
              return { name, used }
            }).filter(entity => !entity.used).map(entity => entity.name)
            return variables
          })

          linkerResultsKeys.map((file, fileIndex) => {
            const unusedVariables = perFileVariables[fileIndex]
            let msgArray = msg.split('\n')

            unusedVariables.forEach(variableName => {
              msgArray = msgArray.filter(line => !line.trim().startsWith(variableName))
            })
            linker(file, begin, end, msgArray.join('\n'), emptySpaces)
          })
        }
      }
        : () => {}
      log()
      return results
    }
  )
}
