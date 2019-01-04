module.exports = (loggerModule, underscoreFunctions, printer, lodashPrinters, commands, stack) => {
  underscoreFunctions.forEach(command=>{
    const printerDelta = loggerModule.registerUnderscoreFunction(command, commands, stack, printer, 'print')
    if(printerDelta.toString() !== printer.toString()){
      lodashPrinters.push(printerDelta)
    }
  })
}
