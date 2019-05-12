module.exports = (parameters, results, infoList) => {
  const tag = parameters.arguments('tag', 'lastArgument')
  const info = parameters.command.has('info') || parameters.command.has('vertical')
  parameters.arguments('information', 'allEntries', [[]]).forEach(e => {
    infoList[e[0]] = '// ' + e[1]
  })

  const maxLineWidth = parameters.arguments('maxLineWidth', 'lastArgument', 120)

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
  msg = msg.split('\n').map(line =>
    line.length > maxLineWidth
      ? (() => {
        const tooLong = '...'
        return line.slice(0, maxLineWidth - tooLong.length) + tooLong
      })()
      : line
  ).join('\n')
  const consoleMessage = tagOpen + msg + tagEnd + tagEqual

  return { msg, consoleMessage, begin, end }
}
