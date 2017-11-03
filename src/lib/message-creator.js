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
  return function (parameters, logEntry, colored, cartoon) {
    let msg = ''
    msg += logEntry.logBody

    msg += dictionary.messageDelimiterLine
    msg += makeColored(colored, `${dictionary.calledFrom}:`, logEntry.calledFrom.fileName + ':' + logEntry.calledFrom.lineNumber +
            ':' + logEntry.calledFrom.columnNumber)
    msg += makeColored(colored, `${dictionary.stackTrace}:`, logEntry.stackTraceFile)
    msg += makeColored(colored, `${dictionary.sessionLog}:`, logEntry.sessionLog)
        // msg += makeColored(colored, 'file log:', logEntry.fileLoggedFromHash);
    msg += makeColored(colored, `${dictionary.loggedAt}:`, logEntry.dateTime)
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
