const dslF = require('dsl-framework')()
const isArray = require('isarray')
const commandFeed = require('./commandInterpreter')
module.exports = (array, registerDslToArray = false) => dslF(function (returnCode, data) {
  if (!isArray(array)) return array
  let result = array.slice(0)

  for (const command of data.commandSequence()) {
    result = commandFeed(command.command, command.arguments, result)
  }

  if (registerDslToArray && Array.isArray(result)) {
    result.dsl = module.exports(result, registerDslToArray)
  }

  return result
})
