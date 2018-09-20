module.exports = exports = (timeoutSate,
                            level,
                            getFrom) => ({
  timeoutSate,
  level,
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
      timeoutSate: timeoutSate,
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
      setCommandName: this.setCommandName
    }
  },

  start(){
    this.reset()
    this.level++
  },

  getData: function () {
    const me = this
    return getFrom(0, { returnArrayChunks: me.returnArrayChunks })
  },

  setCommandArguments(arguments = false){
    if(!arguments){
      arguments = []
    }
    let newChain = false
    if(this.commandName){
      // l(this.commandName)()
      arguments = [this.commandName, ...arguments]
      newChain =true
      this.commandName = false
    }
    this.returnArrayChunks.push(arguments)

    return newChain
  },

  setCommandName(commandName){
    let newChain = false
    if(this.commandName){
      newChain = this.setCommandArguments()
    }
    this.commandName = commandName

    return newChain
  }
})
