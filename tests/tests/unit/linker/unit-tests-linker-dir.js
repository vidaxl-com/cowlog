/* eslint-env mocha */
require('../../../lib/test-common')
const path = require('path')
const fs = require('fs')
const copyFileSync = require('fs-copy-file-sync')
const appContainer = require(`../../../../src/app/container`)()
const readmeFileName = appContainer.readmeFileName
require('../../../../src/index')()
require('chai').should()
const cwd = require('pkg-dir').sync(__dirname)

describe('Testing', function () {
  describe('@linker-dir', function () {
    it('test @linker-dir-template', function () {
      let linker = require('../../../../src/lib/misc/linker/linker-dir')
      let tmpdir = path.join(cwd, 'tmp')
      let tmpFile = path.join(tmpdir, readmeFileName)
      copyFileSync(path.join(cwd, readmeFileName), tmpFile)
      copyFileSync(path.join(cwd, readmeFileName), tmpFile + 'copy')
      let fileNames = linker(tmpdir, '<!--- example begin -->', '<!--- example end -->', '+++***---')
      if (!Object.keys(fileNames)[0]){
        throw "As a result you have at least one file changed by now"
      }

    })

    it('test @linker-dir-return', function () {
      let linker = require('../../../../src/lib/misc/linker/linker-dir')
      let tmpdir = path.join(cwd, 'tmp')
      let tmpFile = path.join(tmpdir, readmeFileName)
      copyFileSync(path.join(cwd, readmeFileName), tmpFile)
      copyFileSync(path.join(cwd, readmeFileName), tmpFile + 'copy')
      let oldCotent = fs.readFileSync(tmpFile, {encoding: 'utf8'})
      let results = linker(tmpdir, '<!--- example begin -->', '<!--- example end -->')
      if (!oldCotent.includes(results)) {
        throw String('There is stg fishy going on!')
      }
      let newCotent = fs.readFileSync(tmpFile, {encoding: 'utf8'})
      newCotent.should.be.equal(oldCotent)
      //todo: test it!
    })

  })
})
