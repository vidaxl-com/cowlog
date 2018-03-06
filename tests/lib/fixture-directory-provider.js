let path = require('path')
let copydir = require('copy-dir')
let randomstring = require('randomstring')
let mkdirp = require('mkdirp')
// source bla bla begin
module.exports = exports = function (file) {
  let fixtureDirectory = path.join(process.cwd(), 'tests/fixtures', file)
  let tmpDirectory = path.join(__dirname, 'tests/tmp', randomstring.generate({
    length: 12,
    charset: 'alphabetic'
  }))
  // source bla bla begin

  mkdirp.sync(tmpDirectory)
  copydir.sync(fixtureDirectory, tmpDirectory)
  return tmpDirectory
}
