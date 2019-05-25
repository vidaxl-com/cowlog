module.exports = (parameters, infoList, results) => {
  const { msg, consoleMessage, begin, end } = require('./message-creator')(parameters, results, infoList)
  parameters.command.has('log') && console.log(require('./prepare-before-placement')(consoleMessage))
  require('./linker')(parameters, msg, begin, end)
}
