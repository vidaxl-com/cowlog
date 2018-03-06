/* eslint-env mocha */
require('../../../../src/index')()
const fixtureDirectoryProvider = require('../../../lib/fixture-directory-provider')
const expect = require('chai').expect
require('chai').should()

describe('Testing', function () {
  describe('@crawler', function () {
    it('test liner', function () {
      let fixtureDirectory = fixtureDirectoryProvider('crawler/empty-destinations')
      l(fixtureDirectory)
    })
  })
})
