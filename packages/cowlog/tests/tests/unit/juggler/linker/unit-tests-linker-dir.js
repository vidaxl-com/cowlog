/* eslint-env mocha */
// require('../../../../lib/test-common')
const path = require('path')
const cwd = require('pkg-dir').sync(__dirname)
const fixturesRoot = path.join(cwd, 'tests/directory-fixtures')
require('../../../../../src/index')()
require('chai').should()
const expect = require('chai').expect

const fixtureDirectoryProvider = require('directory-fixture-provider')(fixturesRoot)

describe('Testing', function () {
  describe('@linker-dir', function () {
    it('test @linker-dir-template', function () {
      let fixtureData = fixtureDirectoryProvider.get('linker/directory')
      let linker = require('../../../../../src/lib/juggler/linker/linker-dir')
      let fileNames = linker(fixtureData.dir,
        '<!--- source qa rewrite begin -->',
        '<!--- source qa rewrite end -->', '+++***---')
      if (!Object.keys(fileNames)[0]) {
        throw String('As a result you have at least one file changed by now')
      }

    })

    it('test @linker-dir-return', function () {
      let linker = require('../../../../../src/lib/juggler/linker/linker-dir')
      let fixtureData = fixtureDirectoryProvider.get('linker/directory')

      let results = linker(fixtureData.dir,
        '<!--- source qa rewrite begin -->',
        '<!--- source qa rewrite emd -->')
      // expect(fixtureData.status().changed).to.equal(false)
      //todo: test it!
    })

  })
})
