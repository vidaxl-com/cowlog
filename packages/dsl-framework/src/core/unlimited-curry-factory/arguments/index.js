const getArrayData = require('../lib/get-array-data')
const process = (parameters) => (command, getProcess, defaultValue) => {
  defaultValue = typeof defaultValue === 'undefined' ? false : defaultValue
  if (Array.isArray(command)) {
    const commands = getArrayData(command)
    return commands.map(c => process(parameters)(c, getProcess, defaultValue))
  }
  if (parameters) {
    let doWeHaveTheCommand = parameters.command.has(command)
    let returnValue = doWeHaveTheCommand ? !!parameters.command.getArguments(command) : defaultValue
    if (getProcess === 'boolean') { return doWeHaveTheCommand }
    if (returnValue === defaultValue) { return returnValue }

    const commandValue = parameters.command.get(command)
    return require('./commandParser')(commandValue, getProcess)
  }
}

module.exports = exports = (parameters) => process(parameters)
exports.toObject = (command, getProcess, defailtValue = false) => {
  Array.isArray(command) || (() => { command = [command] })()
}
