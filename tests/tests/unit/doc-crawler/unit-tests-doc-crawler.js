/* eslint-env mocha */
// require('../../../../src/index')()
const fixtureDirectoryProvider = require('../../../../src/lib/misc/fixture-provider/directory-fixture')
require('chai').should()
const docCrawler = require('../../../../src/lib/misc/doc-crawler/doc-crawler')
const crawler = require('../../../../src/lib/misc/crawler/crawler')

const path = require('path')
const expect = require('chai').expect

describe('Testing', function () {
  describe('@doc-crawler', function () {
    it('crawls @javascript', function () {
      let fixtureDirectory = path.join('crawler/javascript')
      let fixtureData = fixtureDirectoryProvider.get(fixtureDirectory)
      crawler(fixtureData.dir)
      l(fixtureData.dir, fixtureData.getStatus().changed)
    })

  })
})
