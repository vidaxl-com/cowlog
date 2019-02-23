'use strict'

module.exports = exports = (container) => (parameters, logEntry, colored, cartoon) => {
    let eventEmitter = module.eventEmitter = container.get('event-emitter')
    let msg = '' + logEntry.logBody

    eventEmitter.emit('console_log_details', colored, logEntry, function (message) {
      msg += message
    })

    let weHaveCartoon = parameters.face
    /* istanbul ignore else */
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
