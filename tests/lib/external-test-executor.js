// const exec = require('sync-exec')
// const { spawn } = require('child_process');
const { exec } = require('child_process');

module.exports = function (test, cb) {
  exec(`node tests/external-tests/${test}-test.js`, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    cb(stdout)
  });
}
