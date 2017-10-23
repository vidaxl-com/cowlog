'use strict';

module.exports =  function(dir, db) {
    return function (string, logTypeString) {

        const hashCreator = require('./hash-creator')(db);
        const path = require('path');
        const fs = require('fs');
        const fsPath = require('fs-path');

        const _insertToString = function (str, index, value) {
            return str.substr(0, index) + value + str.substr(index);
        };

        const _makeFileNameHashPath = function (string) {
            return _insertToString(hashCreator(string), 2, '/')
        };

        const _makeHashPath = function (relativeFilePath, logTypeString) {
            if (!logTypeString) {
                logTypeString = '.log';
            }
            return path.join(dir + relativeFilePath) + logTypeString;
        };


        let hash = hashCreator(string);
        let relativeFilePath = _makeFileNameHashPath(hash);
        let filePath = _makeHashPath(relativeFilePath, '_' + logTypeString);

        if (!fs.existsSync(filePath)) {
            fsPath.writeFileSync(filePath, string)
        }

        return filePath;
    }
}