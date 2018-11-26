const dslF = require('dsl-framework')
const isArray = require('isarray')
const commandFeed = require('./commandInterpreter')

module.exports = array => dslF(function (returnCode, data) {
  if (!isArray(array)) return array
  let result = array.slice(0)
  data.data.returnArrayChunks.forEach((command) => {
    result = commandFeed(command[0], command.slice(1), result)
  })
  return result
})
