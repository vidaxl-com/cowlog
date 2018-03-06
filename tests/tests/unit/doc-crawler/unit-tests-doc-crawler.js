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
      [
        {
          sb: '<!--- source qa rewrite begin -->',
          se: '<!--- source qa rewrite end -->',
          db: '<!--- destination qa rewrite begin -->',
          de: '<!--- destination qa rewrite end -->'
        },
        {
          sb: '<!--- source part of cowlog begin -->',
          se: '<!--- source part of cowlog end -->',
          db: '<!--- destination part of cowlog begin -->',
          de: '<!--- destination part of cowlog end -->'
        },
        {
          sb: '<!--- source qa rewrite begin -->',
          se: '<!--- source qa rewrite end -->',
          db: '<!--- destination qa rewrite begin -->',
          de: '<!--- destination qa rewrite end -->'
        }
      ].forEach(function (data) {
        let fixtureDirectory = fixtureDirectoryProvider('crawler/empty-destinations')
        let sourceQa = directoryLinker(fixtureDirectory, data.sb, data.se)
        let destinationQa = directoryLinker(fixtureDirectory, data.db, data.de)
        destinationQa.should.to.equal('')
        docCrawler(fixtureDirectory)
        let destinationQa2 = directoryLinker(fixtureDirectory, data.db, data.de)
        destinationQa2.should.to.equal(sourceQa)
      })
    })
  })
})
