const getFrom = function (from, dataArgument = null) {
  let workData = dataArgument || this.data
  let returnArrayChunks = workData.returnArrayChunks.slice(from)
  let returnArray = []
  returnArrayChunks.forEach(chunkData=>chunkData.forEach(pieceData=>returnArray.push(pieceData)))
  const data = {returnArray, returnArrayChunks}
  let returnObject = {data, getFrom}

  return returnObject
}

const safetyExecutor = function safetyExecutor (data, callback) {
  if(callback && 'function' === typeof callback){
    timeoutSate = setTimeout(function ucCallback() {
      callback(0, data)
    }, 0)
  }
}

const unlimitedCurry = function (callback, returnFunction) {

  let timeoutSate = null

  let level = 0
  let returnArray = []
  let returnArrayChunks = []

  let caller = function(lastCall) {
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
    caller.data = getFrom(0, {returnArrayChunks})

    caller.p = caller.p || new Promise((resolve, reject)=>{
      const ret = returnFunction ? returnFunction() : caller.data
      return resolve(ret)
    })

    let data = getFrom(0, {returnArrayChunks})
    if(!lastCall){
      level = 0
      if(callback){
        if(typeof callback === "function"){
          clearInterval(timeoutSate);
          callback(0, data)
        }
        return caller.p
      }
      else{
        return data
      }
    }
    if(lastCall){
      safetyExecutor(data, callback)
    }
    level++
    return caller
  }

  return caller(returnArray)
}

module.exports = exports = unlimitedCurry

