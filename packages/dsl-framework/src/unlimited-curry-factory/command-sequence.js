const commandParserFactory = (value) => (getProcess) => require('./get-command-arguments/commandParser')(value, getProcess)

module.exports = exports = (returnObject) => function * () {
  let commands = returnObject.data.returnArrayChunks
  for (let i = 0; i <= commands.length - 1; i++) {
    const value = commands[i]
    const command = commands[i][0]
    yield {
      command,
      arguments: commandParserFactory(value)('allEntries')[0]
    }
  }
}
