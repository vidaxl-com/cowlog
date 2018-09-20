module.exports = exports = (timeoutSate,
                            level,
                            returnArray,
                            returnArrayChunks,
                            getFrom) => ({
  timeoutSate,
  level,
  returnArray,
  returnArrayChunks,
  resetMe: false,
  reset: function () {
    if (this.resetMe) {
      this.level = 0
      this.returnArray = []
      this.returnArrayChunks = []
      this.resetMe = false
    }
  },

  clone: function () {
    return {
      timeoutSate: timeoutSate,
      level: this.level,
      returnArray: this.returnArray.slice(0),
      returnArrayChunks: this.returnArrayChunks.slice(0),
      resetMe: this.resetMe,
      reset: this.reset,
      clone: this.clone,
      getData: this.getData
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

  setCommandArguments(arguments){
    this.returnArrayChunks.push(arguments)
  }

})
