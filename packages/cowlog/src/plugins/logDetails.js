// todo: Needs refactoring!
const weGotMarkdown = process.env.markdown
const op = require('object-path')
module.exports = exports = {
  consoleLogDetails: {
    name: 'consoleLogDetaisDefault',
    register: function (container) {
      let eventEmitter = container.get('event-emitter')
      let dictionary = container.get('dictionary')
      let coloring = container.get('message-coloring')

      eventEmitter.on('console_log_details', function (colored, logEntry, addtoMsg) {
        /* istanbul ignore else */
        if (colored && weGotMarkdown) {
          colored = false
        }
        let msg = dictionary.messageDelimiterLine
        msg += coloring(colored, `${dictionary.calledFrom}: `, op.get(logEntry, 'calledFrom.fileName', '') + ':' + op.get(logEntry, 'calledFrom.lineNumber', '') +
          ':' + op.get(logEntry, 'calledFrom.columnNumber', ''))
        msg += coloring(colored, `${dictionary.stackTrace}: `, logEntry.stackTraceFile)
        msg += logEntry.sessionLog ? coloring(colored, `${dictionary.sessionLog}: `, logEntry.sessionLog) : ''
        msg += coloring(colored, `${dictionary.loggedAt}: `, logEntry.dateTime)
        addtoMsg(msg)
      })
    }
  }
}
