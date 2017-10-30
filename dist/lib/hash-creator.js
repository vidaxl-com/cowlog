'use strict';

var sha256 = require('sha256');

module.exports = function () {
  return function (data) {
    var hash = sha256(data);

    return hash;
  };
};