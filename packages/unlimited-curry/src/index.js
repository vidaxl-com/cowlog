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
      callback(0, data)
    }, 0)
  }

  return timeoutSate
}

const unlimitedCurry = function (callback, returnFunction) {
  return function () {
    let timeoutSate = null
    let level = 0
    let returnArray = []
    let returnArrayChunks = []

    let caller = function(haveArguments) {
      let firstCall = !level
      if(firstCall){
        caller.p = null
        returnArrayChunks = []
        level++

        return caller
      }
      const callerArguments = Array.from(arguments)
      if(!firstCall && callerArguments.length){
        returnArrayChunks.push(callerArguments)
      }

      let data = caller.data = getFrom(0, {returnArrayChunks})

      caller.p = () => new Promise((resolve, reject)=>{
        const ret = returnFunction ? returnFunction(caller.data) : caller.data
        return resolve(ret)
      })
      /* istanbul ignore else */
      if(!haveArguments){
        level = 0
        /* istanbul ignore else */
        if(callback){
          /* istanbul ignore else */
          if(typeof callback === "function"){
            clearTimeout(timeoutSate);
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
        if(timeoutSate){
          clearTimeout(timeoutSate)
        }
        timeoutSate = safetyExecutor(data, callback)
      }
      level++

      return caller
    }

    return caller(returnArray)
  }()
}

module.exports = exports = unlimitedCurry

