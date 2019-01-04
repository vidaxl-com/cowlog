module.exports = (commands, afterPrintCommandOrder,loggerModule,exitState, retv, data, logEntry) => {
  afterPrintCommandOrder.forEach(command=>{
    if(command === 'last' && commands.command.has(command)){
      loggerModule.runtimeVariables.lastLogs = []
      loggerModule.runtimeVariables.lastLogs.push(logEntry)
    }

    if(command === 'mute' && commands.command.has(command)){
      exitState.muted = true
    }

    if(command === 'lasts' && commands.command.has('lasts')){
      if(!exitState.lastsed){
        loggerModule.runtimeVariables.lastLogs = loggerModule.runtimeVariables.lastLogs || []
        loggerModule.runtimeVariables.lastLogs.push(logEntry)
        exitState.lastsed = true
      }
    }

    if(command === 'return' && commands.command.has(command)){
      retv.retv = data.data.returnArrayChunks[0][data.data.returnArrayChunks[0].length-1]
    }

    if(command === 'die' && commands.command.has(command)){
      exitState.dead = true
    }
  })
}
