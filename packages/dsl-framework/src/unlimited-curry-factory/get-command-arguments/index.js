module.exports = exports = (parameters) => (command, getProcess, defaultValue = false) => {
  // const parameters = this.parameters
  if (parameters) {
    let doWeHaveTheCommand = parameters.command.has(command)
    let returnValue = doWeHaveTheCommand ? !!parameters.command.getArguments(command) : defaultValue
    if (getProcess === 'boolean') return doWeHaveTheCommand
    if (returnValue === defaultValue) return returnValue

    const commandValue = parameters.command.get(command)
    return require('./commandParser')(commandValue, getProcess)
  }
}
