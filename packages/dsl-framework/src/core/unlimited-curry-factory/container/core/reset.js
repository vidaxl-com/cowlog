module.exports = function () {
  if (this.resetMe) {
    this.level = 0
    this.returnArray = []
    this.returnArrayChunks = []
    this.resetMe = false
    this.commandName = false
  }
}
