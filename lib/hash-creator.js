'use strict'
const sha256 = require('sha256')

module.exports = function () {
  return function (data) {
    let hash = sha256(data)

    return hash
  }
}
