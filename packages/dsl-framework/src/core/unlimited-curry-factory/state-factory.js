module.exports = exports = () => ({
  p: null,
  setCoreData: function (coreData) {
    this.coreData = coreData
  },
  getCoreData: function () {
    return this.coreData
  },
  getFrom: function (from, returnArrayChunks = []) {
    if (this.reset) {
      returnArrayChunks = this.returnArrayChunks
      if (this.commandName) {
        returnArrayChunks.push([this.commandName])
      }
    }
    let returnArray = []
    returnArrayChunks.forEach(chunkData => chunkData.forEach(pieceData => returnArray.push(pieceData)))
    const data = { returnArray, returnArrayChunks }
    const me = this
    let returnObject = { data, getFrom: me.getFrom }
    returnObject.command = require('./command-parser')(returnObject)
    returnObject.arguments = require('./get-command-arguments')(returnObject)
    returnObject.commandSequence = require('./command-sequence')(returnObject)

    return returnObject
  },
  level: 0,
  returnArray: [],
  returnArrayChunks: [],
  commandName: false,
  resetMe: false,
  reset: function () {
    if (this.resetMe) {
      this.level = 0
      this.returnArray = []
      this.returnArrayChunks = []
      this.resetMe = false
      this.commandName = false
    }
  },

  clone: function () {
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
  },

  start () {
    this.reset()
    this.level++
  },

  getData: function () {
    return this.getFrom(0)
  },

  setCommandArguments (commandArguments = false) {
    if (!commandArguments) {
      commandArguments = []
    }
    let newChain = false
    if (this.commandName) {
      // l(this.commandName)()
      commandArguments = [this.commandName, ...commandArguments]
      newChain = true
      this.commandName = false
    }
    this.returnArrayChunks.push(commandArguments)

    return newChain
  },

  setCommandName (commandName) {
    let newChain = false
    if (this.commandName) {
      newChain = this.setCommandArguments()
    }
    this.commandName = commandName

    return newChain
  }
})
