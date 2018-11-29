module.exports = exports =
  /**
   *
   * @param commandValue
   * This is a camel-cased string can start with all,first,last
   * can end with Argument, Entry or Entries
   * 'first' and 'last' refers to the command, because it is possible that
   * someone called the same dsl command multiple times.
   * 'Entries' has only meaning in this context if the first word is 'all'.
   * Entry is all the arguments that belongs to this command,
   * Argument only gives back the first argument of a command.
   *
   * @param getProcess
   * @returns {*}
   */
  (commandValue, getProcess = 'allEntries') => {
   commandValue = Array.isArray(commandValue) && Array.isArray(commandValue[0])?commandValue:[commandValue]
  let dataToProcess = getProcess.startsWith('first')?commandValue[0]:
                        getProcess.startsWith('last')?commandValue[commandValue.length-1]:
                        getProcess.startsWith('all')?commandValue:commandValue

  if(Array.isArray(dataToProcess)){
    if (getProcess.endsWith('Argument')) return dataToProcess[1]
    if (getProcess.endsWith('Entry')) return dataToProcess.slice(1)
    if (getProcess === 'allEntries') return commandValue.map((entry) => entry.slice(1))
  }
  return [[]]
}
