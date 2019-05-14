const { linkerDir } = require('generic-text-linker')
const { tokenize } = require('esprima')
const fs = require('fs')
const linker = require('../../linker')
const compare = require('compare')

module.exports = (parameters, msg, begin, end) => {
  const linkDirectory = parameters.arguments('linkDirectory', 'lastArgument')
  const removeUnused = parameters.command.has('removeUnused')
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
        return {name, used}
      }).filter(entity => !entity.used).map(entity => entity.name)

      return variables
    })

    linkerResultsKeys.map((file, fileIndex) => {
      const unusedVariables = perFileVariables[fileIndex]
      let msgArray = msg.split('\n')

      unusedVariables.forEach(variableName => {
        msgArray = msgArray.filter(line => !line.trim().startsWith(variableName))
      })

      linker(file, begin, end, msgArray
        // .sort(compare)
        .join('\n'), emptySpaces)
    })
  }
}
