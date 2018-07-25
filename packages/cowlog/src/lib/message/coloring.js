module.exports = exports = function (container) {
  return function (colored, label, message, noNewline) {
    let msg = ''
    /* istanbul ignore else */
    if (!noNewline) {
      label = '\n' + label
    }
    msg += ' '.reset
    msg += colored ? label.inverse + ''.reset : label
    msg += message
      /* istanbul ignore else */
    if (!noNewline) {
      msg += ' '
    }

    return msg
  }
}
