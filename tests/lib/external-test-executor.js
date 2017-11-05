const { exec } = require('child_process');
module.exports = function (test, cb) {
  let testCommand = `node tests/external-tests/${test}-test.js`
  exec(testCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    cb(stdout)
  });
}
