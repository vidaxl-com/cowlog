const { exec } = require('child_process')
const glob = require('glob')
const stripAnsi = require('strip-ansi')

let filePathPiece = __dirname.split('/')
filePathPiece = filePathPiece[filePathPiece.length-3]
if(filePathPiece === 'dist'){
  filePathPiece = filePathPiece + '/'
}
else{
  filePathPiece=''
}

module.exports = function (test, cb) {

  let testFile = glob.sync(`${filePathPiece}tests/external-tests/*-${test}-test.js`)[0]
    ||
    glob.sync(`dist/tests/external-tests/*-${test}-test.js`)[0]
  let testCommand = `node ${testFile}`
  exec(testCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`)
      return
    }

    cb(stripAnsi(stdout))
  })
}
