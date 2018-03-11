/* eslint-env mocha */
// require('../../../../src/index')()
const fixtureDirectoryProvider = require('../../../../src/lib/juggler/fixture-provider/directory-fixture')
require('chai').should()
const docCrawler = require('../../../../src/lib/juggler/doc-crawler/doc-crawler')
const directoryLinker = require('../../../../src/lib/juggler/linker/linker-dir')
const path = require('path')
const expect = require('chai').expect

describe('Testing', function () {
  describe('@doc-crawler', function () {
    it('modify', function () {
      [
        {
          se: '<!--- source qa rewrite end -->',
          sb: '<!--- source qa rewrite begin -->',
          de: '<!--- destination qa rewrite end -->',
          db: '<!--- destination qa rewrite begin -->',
        },
        {
          se: '<!--- source part of cowlog end -->',
          sb: '<!--- source part of cowlog begin -->',
          de: '<!--- destination part of cowlog end -->',
          db: '<!--- destination part of cowlog begin -->',
        },
        {
          sb: '<!--- source qa rewrite begin -->',
          se: '<!--- source qa rewrite end -->',
          de: '<!--- destination qa rewrite end -->',
          db: '<!--- destination qa rewrite begin -->',
        }
      ].forEach(function (data) {
        let fixtureData = fixtureDirectoryProvider.get('crawler/empty-destinations')
        let sourceQa = directoryLinker(fixtureData.dir, data.sb, data.se)
        let destinationQa = directoryLinker(fixtureData.dir, data.db, data.de)
        destinationQa.should.to.equal('')
        expect(fixtureData.getStatus().changed).to.equal(false)
        docCrawler(fixtureData.dir)
        expect(fixtureData.getStatus().changed).to.equal(true)
        let destinationQa2 = directoryLinker(fixtureData.dir, data.db, data.de)
        destinationQa2.should.to.equal(sourceQa)
      })
    })

    it('modify empty lines', function () {
      let baseFolder = 'crawler/empty-lines-destinations'
      let fixtureData = fixtureDirectoryProvider.get(baseFolder)
      docCrawler(fixtureData.dir)
      // l(fixtureData.getStatus().contents)
      expect(fixtureData.getStatus().changed).to.equal(true)
    })

    it('modify source malformed', function () {
      let baseFolder = 'crawler/malformed'
      let folders = [
        {
          number: 1,
          changed: false
        },
        {
          number: 2,
          changed: false
        }
      ]
      folders.forEach(function (data) {
        let fixtureDirectory = path.join(baseFolder, `${data.number}`)
        let fixtureData = fixtureDirectoryProvider.get(fixtureDirectory)
        docCrawler(fixtureData.dir)
        // l(fixtureData.status())
        expect(fixtureData.getStatus().changed).to.equal(data.changed, `malformed files ${data.number}`)
      })
    })
  })
})
