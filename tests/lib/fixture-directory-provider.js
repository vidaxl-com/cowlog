let path = require('path')
let copydir = require('copy-dir')
let randomstring = require('randomstring')
let mkdirp = require('mkdirp')

module.exports = exports = function (file) {
  let fixtureDirectory = path.join(process.cwd(), 'tests/fixtures', file)
  let tmpDirectory = path.join(__dirname, 'tests/tmp', randomstring.generate({
    length: 12,
    charset: 'alphabetic'
  }))
  mkdirp.sync(tmpDirectory)
  copydir.sync(fixtureDirectory, tmpDirectory)
  return tmpDirectory
}
