const commandInterpreter = (command, commandArguments, result, arrifyOn) =>
  require('./commands')(result, commandArguments, arrifyOn)[command]()
const dslF = require('dsl-framework').noTriggerEndOfExecution.noPromoises()
const isArray = require('isarray')
const arrify = require('arrify')
module.exports = (array, registerDslToArray = false) => dslF(function (returnCode, data) {
  const arrifyOn = data.command.has('arrify')
  if (!isArray(array)) {
    if (arrifyOn) {
      return arrify(array)
    }
    return array
  }
  let result = array.slice(0)

  for (const command of data.commandSequence()) {
    result = commandInterpreter(command.command, command.arguments, result, arrifyOn)
  }

  if (registerDslToArray && Array.isArray(result)) {
    result.dsl = module.exports(result, registerDslToArray)
  }

  return result
})
