/* eslint-env mocha */
// require('../../../../src/index')()
const fixtureDirectoryProvider = require('../../../../src/lib/misc/fixture-provider/directory-fixture')
require('chai').should()
const docCrawler = require('../../../../src/lib/misc/doc-crawler/doc-crawler')
const directoryLinker = require('../../../../src/lib/misc/linker/linker-dir')
const path = require('path')
const expect = require('chai').expect

describe('Testing', function () {
  describe('@doc-crawler', function () {
    it('modify', function () {
      [
        {
          sb: '<!--- source qa rewrite fixture begin -->',
          se: '<!--- source qa rewrite fixture end -->',
          db: '<!--- destination qa rewrite fixture begin -->',
### QA
[![CircleCI](https://circleci.com/gh/vidaxl-com/cowlog/tree/master.svg?style=svg)](https://circleci.com/gh/vidaxl-com/cowlog/tree/master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/test_coverage)](https://codeclimate.com/github/vidaxl-com/cowlog/test_coverage)
[![bitHound Overall Score](https://www.bithound.io/github/vidaxl-com/cowlog/badges/score.svg)](https://www.bithound.io/github/vidaxl-com/cowlog)
[![bitHound Dependencies](https://www.bithound.io/github/vidaxl-com/cowlog/badges/dependencies.svg)](https://www.bithound.io/github/vidaxl-com/cowlog/master/dependencies/npm)
[![Maintainability](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/maintainability)](https://codeclimate.com/github/vidaxl-com/cowlog/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/vidaxl-com/cowlog/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vidaxl-com/cowlog?targetFile=package.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog?ref=badge_shield)
[![Greenkeeper badge](https://badges.greenkeeper.io/vidaxl-com/cowlog.svg)](https://greenkeeper.io/)
          de: '<!--- destination qa rewrite fixture end -->'
        },
        {
          sb: '<!--- source part of cowlog fixture begin -->',
          se: '<!--- source part of cowlog fixture end -->',
          db: '<!--- destination part of cowlog fixture begin -->',
          de: '<!--- destination part of cowlog fixture end -->'
        },
        {
          sb: '<!--- source qa rewrite fixture begin -->',
          se: '<!--- source qa rewrite fixture end -->',
          db: '<!--- destination qa rewrite fixture begin -->',
### QA
[![CircleCI](https://circleci.com/gh/vidaxl-com/cowlog/tree/master.svg?style=svg)](https://circleci.com/gh/vidaxl-com/cowlog/tree/master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/test_coverage)](https://codeclimate.com/github/vidaxl-com/cowlog/test_coverage)
[![bitHound Overall Score](https://www.bithound.io/github/vidaxl-com/cowlog/badges/score.svg)](https://www.bithound.io/github/vidaxl-com/cowlog)
[![bitHound Dependencies](https://www.bithound.io/github/vidaxl-com/cowlog/badges/dependencies.svg)](https://www.bithound.io/github/vidaxl-com/cowlog/master/dependencies/npm)
[![Maintainability](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/maintainability)](https://codeclimate.com/github/vidaxl-com/cowlog/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/vidaxl-com/cowlog/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vidaxl-com/cowlog?targetFile=package.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog?ref=badge_shield)
[![Greenkeeper badge](https://badges.greenkeeper.io/vidaxl-com/cowlog.svg)](https://greenkeeper.io/)
          de: '<!--- destination qa rewrite fixture end -->'
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
