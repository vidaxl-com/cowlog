const getFrom = module.exports = exports = (from, dataArgument) => {
  let workData = dataArgument
  let returnArrayChunks = workData.returnArrayChunks.slice(from)
  let returnArray = []
  returnArrayChunks.forEach(chunkData => chunkData.forEach(pieceData => returnArray.push(pieceData)))
  const data = { returnArray, returnArrayChunks }
  let returnObject = { data, getFrom }
  returnObject.command = require('./command-parser')(returnObject)

  return returnObject
}
