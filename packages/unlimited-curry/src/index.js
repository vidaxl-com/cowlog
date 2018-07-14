const getFrom = function (from, dataArgument) {
  let workData = dataArgument
  let returnArrayChunks = workData.returnArrayChunks.slice(from)
  let returnArray = []
  returnArrayChunks.forEach(chunkData=>chunkData.forEach(pieceData=>returnArray.push(pieceData)))
  const data = {returnArray, returnArrayChunks}
  let returnObject = {data, getFrom}

  return returnObject
}

const safetyExecutor = function safetyExecutor (data, callback) {
  let timeoutSate = null
  if(callback && 'function' === typeof callback){
    timeoutSate = setTimeout(function ucCallback() {
      callback(2, data)
    }, 0)
  }

  return timeoutSate
}

const UnlimitedCurry = function (callback) {
  return function () {
    let timeoutSate = null
    let level = 0
    let returnArray = []
    let returnArrayChunks = []

    const state = {
      timeoutSate,level,returnArray,returnArrayChunks, resetMe: false,
      reset: function () {
        if(this.resetMe){
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
          reset:this.reset
        }
      },

      getData: function(){
        const me = this
        return getFrom(0, {returnArrayChunks: me.returnArrayChunks})
      }

    }

    let caller = function(haveArguments) {
      state.reset()
      let firstCall = !state.level
      if(firstCall){
        caller.p = null
        returnArrayChunks = []
        state.level++

        return caller
      }
      const callerArguments = Array.from(arguments)
      if(!firstCall && callerArguments.length){
        state.returnArrayChunks.push(callerArguments)
      }

      let data = caller.data = getFrom(0, {returnArrayChunks: state.returnArrayChunks})

      caller.p = () => new Promise((resolve, reject)=>{
        clearTimeout(state.timeoutSate)
        const conedState = state.clone()
        let ret = false
        if(typeof callback === 'function'){
          ret = callback(1, caller.data)
        }else{
          ret = data
        }
        state.resetMe = true
        return resolve(ret)
      })
      /* istanbul ignore else */
      if(!haveArguments){
        /* istanbul ignore else */
        if(callback){
          /* istanbul ignore else */
          if(typeof callback === "function"){
            clearTimeout(state.timeoutSate);
            state.resetMe = true
            return callback(0, data)
          }
          return caller.p()
        }
        /* istanbul ignore else */
        if(!callback){
          return data
        }
      }
      /* istanbul ignore else */
      if(haveArguments){
        /* istanbul ignore else */
        if(state.timeoutSate){
          clearTimeout(state.timeoutSate)
        }
        state.timeoutSate = safetyExecutor(data, callback)
      }
      state.level++

      return caller
    }

    return caller(state.returnArray)
  }()
}

module.exports = exports = UnlimitedCurry
