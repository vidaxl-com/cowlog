/* eslint-env mocha */
require('../../../../src/index')()
const fixtureDirectoryProvider = require('../../../lib/fixture-directory-provider')
// const expect = require('chai').expect
require('chai').should()
const docCrawler = require('../../../../src/lib/misc/doc-crawler/doc-crawler')
// const fileLinker = require('../../../../src/lib/misc/linker/linker-file')
const directoryLinker = require('../../../../src/lib/misc/linker/linker-dir')
describe('Testing', function () {
  describe('@doc-crawler', function () {
    it('modify', function () {
      let fixtureDirectory = fixtureDirectoryProvider('crawler/empty-destinations')

      let sourceQa = directoryLinker(fixtureDirectory,
        '<!--- source qa rewrite begin -->',
        '<!--- source qa rewrite end -->')
      let destinationQa = directoryLinker(fixtureDirectory,
        '<!--- destination qa rewrite begin -->',
        '<!--- destination qa rewrite end -->')

      destinationQa.should.to.equal('')

      docCrawler(fixtureDirectory)

      let destinationQa2 = directoryLinker(fixtureDirectory,
        '<!--- destination qa rewrite begin -->',
        '<!--- destination qa rewrite end -->')

      destinationQa2.should.to.equal(sourceQa)
    })
  })
})
