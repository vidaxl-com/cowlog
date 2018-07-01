/* eslint-env mocha */
const path = require('path')

const cwd = require('pkg-dir').sync(__dirname)
const fixturesRoot = path.join(cwd, 'tests/directory-fixtures')
const fixtureDirectoryProvider = require('directory-fixture-provider')(fixturesRoot)
require('chai').should()
const docCrawler = require('../../../../../src/lib/juggler/doc-crawler/doc-crawler')
const {linkerDir} = require('generic-text-linker')
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
        let sourceQa = linkerDir(fixtureData.dir, data.sb, data.se)
        let destinationQa = linkerDir(fixtureData.dir, data.db, data.de)
        destinationQa.should.to.equal('')
        expect(fixtureData.getStatus().changed).to.equal(false)
        docCrawler(fixtureData.dir)
        expect(fixtureData.getStatus().changed).to.equal(true)
        let destinationQa2 = linkerDir(fixtureData.dir, data.db, data.de)
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

    it('similar path destinations', function () {
      let baseFolder = 'crawler/similar-path-destinations'

        let fixtureDirectory = baseFolder
        let fixtureData = fixtureDirectoryProvider.get(fixtureDirectory)
        docCrawler(fixtureData.dir)
        expect(fixtureData.getStatus().changed).to.equal(false)
    })

    it('Javascript comments', function () {
      let baseFolder = 'crawler/javascript'

      let fixtureDirectory = baseFolder
      let fixtureData = fixtureDirectoryProvider.get(fixtureDirectory)
      docCrawler(fixtureData.dir)
      // expect(fixtureData.getStatus().changed).to.equal(false)
    })
  })
})
