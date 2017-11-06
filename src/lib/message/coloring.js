module.exports = exports = function (container) {
  return function (colored, label, message, noNewline) {
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
}
