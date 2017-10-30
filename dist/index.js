'use strict';

module.exports = function (parameters) {
  return function () {
    var appContainer = require('./app/container');
    appContainer['runtime-variables'].calculatedParameters = require('./app/configParser')(parameters);
    return appContainer.cowlog();
  }();
};