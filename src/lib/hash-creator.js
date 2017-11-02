'use strict'
const sha256 = require('sha256')

module.exports = exports = function () {
  return function (data) {
    let hash = sha256(data)

    return hash
  }
}
