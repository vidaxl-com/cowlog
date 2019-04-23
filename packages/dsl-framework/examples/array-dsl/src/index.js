const dslF = require('dsl-framework').noTriggerEndOfExecution.noPromoises()
const isArray = require('isarray')
const commandInterpreter = require('./commandInterpreter')
module.exports = (array, registerDslToArray = false) => dslF(function (returnCode, data) {
  if (!isArray(array)) return array
  let result = array.slice(0)

  for (const command of data.commandSequence()) {
    result = commandInterpreter(command.command, command.arguments, result)
  }

  if (registerDslToArray && Array.isArray(result)) {
    result.dsl = module.exports(result, registerDslToArray)
  }

  return result
})
