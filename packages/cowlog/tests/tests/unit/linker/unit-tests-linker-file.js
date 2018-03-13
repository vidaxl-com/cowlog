/* eslint-env mocha */
require('../../../lib/test-common')
const path = require('path')
const fs = require('fs')
const copyFileSync = require('fs-copy-file-sync')
const appContainer = require(`../../../../src/app/container`)()
const readmeFileName = appContainer.readmeFileName
const expect = require('chai').expect
require('chai').should()
const cwd = require('pkg-dir').sync(__dirname)

describe('Testing', function () {
  describe('@linker-file', function () {
    let linker = require('../../../../src/lib/juggler/linker/linker-file')
    it('changed content', function () {
      let tmpFile = path.join(cwd, 'tmp', readmeFileName)
      copyFileSync(path.join(cwd, readmeFileName), tmpFile)
      let result = linker(tmpFile, '<!--- example begin -->', '<!--- example end -->', '+++')

      let {changed} = result.meta

      expect(changed.all).to.equal(true)
      expect(changed.withoutWhiteSpaces).to.equal(true)
      expect(changed.status).to.equal('write')
    })

    it('not changed content', function () {
      let tmpFile = path.join(cwd, 'tmp', readmeFileName)
      copyFileSync(path.join(cwd, readmeFileName), tmpFile)
      let result = linker(tmpFile, '<!-- example begin -->', '<!-- example end -->', '+++')
      let {changed} = result.meta

      expect(changed.all).to.equal(false)
      expect(changed.withoutWhiteSpaces).to.equal(false)
      expect(changed.status).to.equal('read')
    })

    it('return selected content', function () {
      let tmpFile = path.join(cwd, 'tmp', readmeFileName)
      copyFileSync(path.join(cwd, readmeFileName), tmpFile)
      let oldCotent = fs.readFileSync(tmpFile, {encoding: 'utf8'})
      let result = linker(tmpFile, '<!--- example begin -->', '<!--- example end -->')
      let {changed} = result.meta

      expect(changed.all).to.equal(false)
      expect(changed.withoutWhiteSpaces).to.equal(false)
      expect(changed.status).to.equal('read')
      oldCotent.should.be.a('string').that.does.include(result.returnData)
    })
  })
})

