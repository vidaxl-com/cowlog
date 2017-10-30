'use strict';

module.exports = function (dir) {
  return function (fileContent, logTypeString) {
    if (typeof logTypeString === 'undefined') {
      logTypeString = '.log';
    }
    var hashCreator = require('./hash-creator')();
    var path = require('path');
    var fs = require('fs');
    var fsPath = require('fs-path');
    var insertToString = function insertToString(str, index, value) {
      return str.substr(0, index) + value + str.substr(index);
    };
    var makeFileNameHashPath = function makeFileNameHashPath(hash) {
      return insertToString(hash, 2, '/');
    };
    var makeHashPath = function makeHashPath(relativeFilePath, logTypeString) {
      return path.join(dir + relativeFilePath) + logTypeString;
    };
    var hash = hashCreator(fileContent);
    var relativeFilePath = makeFileNameHashPath(hash);
    var filePath = makeHashPath(relativeFilePath, '_' + logTypeString);
    if (!fs.existsSync(filePath)) {
      fsPath.writeFileSync(filePath, fileContent);
    }

    return filePath;
  };
};