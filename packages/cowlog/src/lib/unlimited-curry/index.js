const _ = require('lodash')
const debounce = require('es6-promise-debounce');
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

const callback = function (cb) {
  let debouncedFunction = _.debounce((data)=>{
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


const promise = async function (cb) {
  let debouncedFunction = _.debounce((data)=>{
    ll(data)
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


module.exports = exports = {
  callback,
  promise
}

// promise(function (e,data) {ll(data)})(111)
ll(promise(()=>{})
  .then(callMe=>{
      ll(callMe)
      callMe('YEY')('yuy')
    },
    (d)=>{}))

// callback(()=>{})()

let debouncedFunction = debounce(function() {
  // ll(11111111111)
  return new Promise(function(resolve) {
    resolve();
  },()=>{});
}, 1);