module.exports = exports = () => ({
  p: null,
  getFrom: function (from, returnArrayChunks = []) {
    if (this.reset) {
      returnArrayChunks = this.returnArrayChunks
      if (this.commandName) {
        returnArrayChunks.push([this.commandName])
      }
    }
    const returnArray = () => {
      const result = []
      returnArrayChunks
        .forEach(chunkData => chunkData.forEach(pieceData => result.push(pieceData)))

      return result
    }
    const data = {
      returnArray,
      returnArrayChunks,
      repeate: {
        // todo: generalize it
        me: require('./repeate-me')
      }
    }
    data.repeate.parent = data

    const me = this
    let returnObject = { data, getFrom: me.getFrom }
    returnObject.command = require('../../command-parser')(returnObject)
    const arg = require('../../arguments')(returnObject)
    returnObject.arguments = arg

    returnObject.arguments.object = (commands, getProcess, defaultValue = false) => {
      const returnObject = {}
      Array.isArray(commands) || (() => { commands = [commands] })()
      commands.forEach((command) => { returnObject[command] = arg(command, getProcess, defaultValue) })
      return returnObject
    }

    returnObject.commandSequence = require('../../command-sequence')(returnObject)

    return returnObject
  },
  level: 0,
  returnArray: [],
  returnArrayChunks: [],
  commandName: false,
  resetMe: false,

  reset: require('./reset'),
  clone: require('./clone'),

  start () {
    this.reset()
    this.level++
  },

  getData: function () {
    return this.getFrom(0)
  },

  setCommandArguments (commandArguments) {
    commandArguments = commandArguments || []
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
