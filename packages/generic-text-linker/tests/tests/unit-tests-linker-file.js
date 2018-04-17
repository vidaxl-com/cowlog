/* eslint-env mocha */
// require('../../../../lib/test-common')
const path = require('path')
const fs = require('fs')
const copyFileSync = require('fs-copy-file-sync')
// const appContainer = require(`../../../../../src/app/container`)()
const readmeFileName = 'README.md'

const cwd = require('pkg-dir').sync(__dirname)
const fixturesRoot = path.join(cwd, 'tests/directory-fixtures')
const fixtureDirectoryProvider = require('directory-fixture-provider')(fixturesRoot)

const expect = require('chai').expect
require('chai').should()

describe('Testing', function () {
  let {linkerFile} = require('../../src/index')
  describe('@linker-file', function () {
    it('changed content', function () {
      let fixtureData = fixtureDirectoryProvider.get('/')
      let result = linkerFile(path.join(fixtureData.dir, readmeFileName), '<!--- example begin -->', '<!--- example end -->', '+++')

      let {changed} = result.meta

      expect(changed.all).to.equal(true)
      expect(changed.withoutWhiteSpaces).to.equal(true)
      expect(changed.status).to.equal('write')
    })

    it('not changed content', function () {
      let fixtureData = fixtureDirectoryProvider.get('/')
      let result = linkerFile(path.join(fixtureData.dir, readmeFileName), '<!-- example begin -->', '<!-- example end -->', '+++')
      let {changed} = result.meta

      expect(changed.all).to.equal(false)
      expect(changed.withoutWhiteSpaces).to.equal(false)
      expect(changed.status).to.equal('read')
    })

    it('return selected content', function () {
      let fixtureData = fixtureDirectoryProvider.get('/')
      // let oldCotent = fs.readFileSync(path.join(fixtureData.dir, readmeFileName), {encoding: 'utf8'})

      let result = linkerFile(path.join(fixtureData.dir, readmeFileName), '<!--- example begin -->', '<!--- example end -->')
      let {changed} = result.meta

      expect(changed.all).to.equal(false)
      expect(changed.withoutWhiteSpaces).to.equal(false)
      expect(changed.status).to.equal('read')
      // oldCotent.should.be.a('string').that.does.include(result.returnData)
    })
  })
})
