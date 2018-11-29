const dslF = require('dsl-framework')
const isArray = require('isarray')
const commandFeed = require('./commandInterpreter')
module.exports = array => dslF(function (returnCode, data) {
  if (!isArray(array)) return array
  let result = array.slice(0)

  for (const command of data.commandSequence()) {
    result = commandFeed(command.command, command.arguments, result)
  }
  data.data.returnArrayChunks.forEach((command) => {
  })
  return result
})
