const { exec } = require('child_process')
const glob = require('glob')
module.exports = function (test, cb) {
  let testFile = glob.sync(`test-build/external-tests/*-${test}-test.js`)[0]
  let testCommand = `node ${testFile}`
  exec(testCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`)
      return
    }
    cb(stdout)
  })
}
