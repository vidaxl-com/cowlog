module.exports = function (dslFrameworkInstance) {
  const returnArrayChunks = this.returnArrayChunks
  return require('../../..')()((e, d) => {
    console.log(returnArrayChunks)
    returnArrayChunks.forEach(commandAndArguments => {
      const command = commandAndArguments[0]
      const arg = commandAndArguments.slice(1, commandAndArguments.length)
      dslFrameworkInstance(command, ...arg)
    })

    return dslFrameworkInstance
  })
}
