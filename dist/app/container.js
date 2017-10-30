'use strict';
/**
 * @returns {{}} application container
 */

var os = require('os');
var path = require('path');

var tmpDir = os.tmpdir();
var cowlogTmpDir = path.join(tmpDir, 'cowlog/');
var cowlogHashDir = path.join(cowlogTmpDir, 'hashes/');

module.exports = function () {
  var Bottle = require('bottlejs');

  var bottle = new Bottle('cowlog');
  var applicationContainer = bottle.container;

  bottle.service('hash-creator', function () {
    return require('../lib/hash-creator')();
  });

  bottle.service('log-file-creator', function () {
    return require('../lib/logfile-creator')(cowlogHashDir);
  });

  bottle.service('cowlog', function (logger, messageCreator, runtimeVariables) {
    return require('../lib/cowlog')(logger, messageCreator, runtimeVariables);
  }, 'logger', 'message-creator', 'runtime-variables');

  bottle.service('logger', function (messageCreator, hashCreator, logFileCreator, runtimeVariables) {
    return require('../lib/logger/logger')(messageCreator, hashCreator, logFileCreator, runtimeVariables);
  }, 'message-creator', 'hash-creator', 'log-file-creator', 'runtime-variables');

  bottle.service('message-creator', function (runtimeVariables) {
    return require('../lib/message-creator')(runtimeVariables);
  }, 'runtime-variables');

  bottle.service('runtime-variables', function (logFileCreator) {
    var hrTime = process.hrtime();
    var sessionLogFile = logFileCreator(hrTime, 'session.log');

    var runtimeVariables = {
      sessionLogFile: sessionLogFile,
      logs: [],
      fileLogs: {},
      collectedLogs: []
    };

    return runtimeVariables;
  }, 'log-file-creator');

  return applicationContainer;
}();