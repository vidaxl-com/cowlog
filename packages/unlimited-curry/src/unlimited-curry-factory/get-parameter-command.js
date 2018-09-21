module.exports = exports = (parameters, command, getProcess, defaultValue = false) => {
  if (parameters) {
    let doWeHaveTheCommand = parameters.command.has(command, parameters)
    let returnValue = doWeHaveTheCommand ? parameters.command.getArguments(command)
      : defaultValue
    if (getProcess === 'boolean') return doWeHaveTheCommand
    if (returnValue === defaultValue) return returnValue
    const commandValue = parameters.command.get(command)
    if (getProcess === 'firstArgument') return commandValue[0][1]
    if (getProcess === 'firstEntry') return commandValue[0].slice(1)
    if (getProcess === 'allEntries') return commandValue.map((entry) => entry.slice(1))
  }
}
