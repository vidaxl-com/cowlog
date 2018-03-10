module.exports = exports = {
  consoleLogDetails: {
    name: 'consoleLogDetaisDefault',
    register: function (container) {
      let eventEmitter = container['event-emitter']
      let dictionary = container.dictionary
      let coloring = container['message-coloring']

      eventEmitter.on('console_log_details', function (colored, logEntry, addtoMsg) {
        let msg = dictionary.messageDelimiterLine
        msg += coloring(colored, `${dictionary.calledFrom}:`, logEntry.calledFrom.fileName + ':' + logEntry.calledFrom.lineNumber +
          ':' + logEntry.calledFrom.columnNumber)
        msg += coloring(colored, `${dictionary.stackTrace}:`, logEntry.stackTraceFile)
        msg += coloring(colored, `${dictionary.sessionLog}:`, logEntry.sessionLog)
        msg += coloring(colored, `${dictionary.loggedAt}:`, logEntry.dateTime)
        addtoMsg(msg)
      })
    }
  }
}
