/* eslint-env mocha */
// require('../../../../lib/test-common')
const path = require('path')
const cwd = require('pkg-dir').sync(__dirname)
const fixturesRoot = path.join(cwd, 'tests/directory-fixtures')

require('chai').should()

const fixtureDirectoryProvider = require('directory-fixture-provider')(fixturesRoot)()

describe('Testing', function () {
  let {linkerDir} = require('../../src/index')

  describe('@linker-dir', function () {
    it('test @linker-dir-template', function () {
      let fixtureData = fixtureDirectoryProvider.get('linker/directory')

      let fileNames = linkerDir(fixtureData.dir,
        '<!--- source qa rewrite begin -->',
        '<!--- source qa rewrite end -->', '+++***---')
      if (!Object.keys(fileNames)[0]) {
        throw String('As a result you have at least one file changed by now')
      }

    })

    it('test @linker-dir-return', function () {
      let linker = require('../../src/linker-dir')
      let fixtureData = fixtureDirectoryProvider.get('linker/directory')

      let results = linkerDir(fixtureData.dir,
        '<!--- source qa rewrite begin -->',
        '<!--- source qa rewrite emd -->')
      // expect(fixtureData.status().changed).to.equal(false)
      //todo: test it!
    })

  })
})
