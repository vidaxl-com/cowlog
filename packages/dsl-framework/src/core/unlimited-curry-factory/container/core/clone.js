module.exports = function () {
  return {
    level: this.level,
    returnArray: this.returnArray.slice(0),
    returnArrayChunks: this.returnArrayChunks.slice(0),
    commandName: this.commandName,
    resetMe: this.resetMe,
    reset: this.reset,
    clone: this.clone,
    getData: this.getData,
    start: this.start,
    setCommandArguments: this.setCommandArguments,
    setCommandName: this.setCommandName,
    getFrom: this.getFrom
  }
}
