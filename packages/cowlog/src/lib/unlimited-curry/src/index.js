const _ = require('lodash')
require('cowlog')()

const getFrom = function (from, dataArgument = null) {
  let workData = dataArgument || this.data
  let returnArrayChunks = workData.returnArrayChunks.slice(from)
  returnArray = []
  returnArrayChunks.forEach(chunkData=>chunkData.forEach(pieceData=>returnArray.push(pieceData)))
  const data = {returnArray, returnArrayChunks}
  returnObject = {data, getFrom}

  return returnObject
}

const detached = function (cb) {
  let debouncsyncedFunction = _.debounce((data)=>{
    cb(0,data)
  }, 0)
  let level = 0
  returnArray = []
  returnArrayChunks = []
  const caller = function(ra) {
    if(!level){
      level++
      return caller
    }
    const callerArguments = Array.from(arguments)
    returnArrayChunks.push(callerArguments)
    debouncedFunction(getFrom(0,{returnArrayChunks}))

    level++
    return caller
  }
  return caller(returnArray)
}

const sync = function (cb) {
  let level = 0
  returnArray = []
  returnArrayChunks = []
  const caller = function(notEmpty) {
    if(!level){
      level++
      return caller
    }
    const callerArguments = Array.from(arguments)
    returnArrayChunks.push(callerArguments)

    if(!notEmpty){
      let data = getFrom(0, {returnArrayChunks})
      if(cb){
        cb(0, data)
      }
      else{
        return data
      }
    }
    level++
    return caller
  }
  return caller(returnArray)
}



module.exports = exports = {
  callback: detached,
  sync
}
// sync((e,d)=>ll(e,d,"ggg"))('a', 'b')('c, 1')()

