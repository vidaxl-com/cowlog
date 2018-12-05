module.exports = exports = (returnObject) => ({
  has: (command) => returnObject.data.returnArrayChunks.some(argumentArray => argumentArray[0] === command),
  get: (command) =>
    returnObject.data.returnArrayChunks.filter(argumentArray => { return argumentArray[0] === command }),
  getArguments: function (command, commands) {
    return this.get(command, commands).map((command) => command.slice(1))
  }
})
