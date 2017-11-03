'use strict'

let makeColored = function (colored, label, message, noNewline) {
  let msg = ''
  if (!noNewline) {
    label = '\n' + label
  }
  msg += ' '.reset
  msg += colored ? label.inverse + ''.reset : label
  msg += message
  if (!noNewline) {
    msg += ' '
  }

  return msg
}

module.exports = exports = function (container) {
  let dictionary = module.dictionary = container.dictionary
  let eventEmitter = module.eventEmitter = container['event-emitter']

  // The first raw implementation of a possible plugin system.
  module.eventEmitter.on('console_log_info', function (colored, logEntry, addtoMsg) {
    let msg = makeColored(colored, `${dictionary.calledFrom}:`, logEntry.calledFrom.fileName + ':' + logEntry.calledFrom.lineNumber +
      ':' + logEntry.calledFrom.columnNumber)
    msg += makeColored(colored, `${dictionary.stackTrace}:`, logEntry.stackTraceFile)
    msg += makeColored(colored, `${dictionary.sessionLog}:`, logEntry.sessionLog)
    msg += makeColored(colored, `${dictionary.loggedAt}:`, logEntry.dateTime)
    addtoMsg(msg)
  })

  return function (parameters, logEntry, colored, cartoon) {
    let msg = '' + logEntry.logBody
    msg += dictionary.messageDelimiterLine

    eventEmitter.emit('console_log_info', colored, logEntry, function (message) {
      msg += message
    })

    let weHaveCartoon = parameters.face
    if (weHaveCartoon && cartoon) {
      msg = parameters.activity({
        text: msg,
        e: 'oO',
        T: 'U ',
        f: parameters.face
      })
    };

    return msg
  }
}
