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

module.exports = function () {
  return function (parameters, logEntry, colored, cartoon) {
    let msg = ''
    msg += logEntry.logBody
    let delimiterLine = '\n' + '_-_-_-_-_-_-_-_-_-_-_-_' + '\n'
    msg += delimiterLine
    msg += makeColored(colored, 'called from:', logEntry.calledFrom.fileName + ':' + logEntry.calledFrom.lineNumber +
            ':' + logEntry.calledFrom.columnNumber)
    msg += makeColored(colored, 'stack trace:', logEntry.stackTraceFile)
    msg += makeColored(colored, 'session log:', logEntry.sessionLog)
        // msg += makeColored(colored, 'file log:', logEntry.fileLoggedFromHash);
    msg += makeColored(colored, 'logged at:', logEntry.dateTime)
        // msg += ' ' + makeColored(colored, 'callback parameter:', logEntry.options, true);
        // msg += ' ' + makeColored(colored, 'log hash:', logEntry.hash, true);
        // logEntry.fileLoggedFromHash = logfileCreator(logEntry.calledFrom.fileName, 'file.log')
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
