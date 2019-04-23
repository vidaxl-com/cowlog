// l('a')()
module.exports = (command, commandArguments, result) => require('./commands')(result,commandArguments)[command]()

