const _ = require('lodash')
// require('cowlog')()

const getFrom = function (from, dataArgument = null) {
  let workData = dataArgument || this.data
  let returnArrayChunks = workData.returnArrayChunks.slice(from)
  returnArray = []
  returnArrayChunks.forEach(chunkData=>chunkData.forEach(pieceData=>returnArray.push(pieceData)))
  const data = {returnArray, returnArrayChunks}
  returnObject = {data, getFrom}

  return returnObject
}

// const detached = function (cb) {
  // let debouncedFunction = _.debounce((data)=>{
  //   cb(0,data)
  // }, 0)
  // let level = 0
  // returnArray = []
  // returnArrayChunks = []
  // const caller = function(ra) {
  //   if(!level){
  //     level++
  //     return caller
  //   }
  //
  //   const callerArguments = Array.from(arguments)
  //   returnArrayChunks.push(callerArguments)
  //   debouncedFunction(getFrom(0,{returnArrayChunks}))
  //
  //   level++
  //   return caller
  // }
  // return caller(returnArray)
// }

const sync = function (cb, returnFunction) {
  level = 0
  returnArray = []
  returnArrayChunks = []

  let caller = function(notEmpty) {
    if(!level){
      caller.p = null
      returnArrayChunks = []
      level++
      return caller
    }
    const callerArguments = Array.from(arguments)
    if(level && callerArguments.length){
      returnArrayChunks.push(callerArguments)
    }
    caller.data = getFrom(0, {returnArrayChunks})

    caller.p = caller.p || new Promise((resolve, reject)=>{
      const ret = returnFunction ? returnFunction() : caller.data
      return resolve(ret)
    })

    if(!notEmpty){
      level = 0
      let data = getFrom(0, {returnArrayChunks})
      if(cb){
        if(typeof cb === "function"){
          cb(0, data)
        }
        return caller.p
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
  // detached,
  sync
}

