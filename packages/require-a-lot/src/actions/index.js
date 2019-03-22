module.exports = (parameters, infoList, results) => {
  const {
    msg,
    consoleMessage,
    begin,
    end
  } = require('./message-creator')(parameters, results, infoList)
  if (parameters.command.has('log'))console.log(consoleMessage)
  require('./linker')(parameters, msg, begin, end)
}
