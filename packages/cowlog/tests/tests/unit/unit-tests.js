/* eslint-env mocha */
require('../../lib/test-common')
const assert = require('chai').assert
const path = require('path')
const cwd = require('pkg-dir').sync(__dirname)
const tmpDir = path.join(cwd, 'tests/tmp/ba')
const mockData = require('../../mockData')
const fs = require('fs')
const _ = require('lodash')
const appContainer = require(`../../../src/app/container`)()
require('../../../src/index')()

const expect = require('chai').expect
require('chai').should()

describe('Testing @cowlog', function () {

  this.timeout(100000)

  describe('hash-creator', function () {
    it('shall provide a hash', function () {
      let hashCreator = appContainer['hash-creator']
      let hash = hashCreator('abc')
      hash.should.be.a('string')
      var hexCheck = new RegExp(/^[0-9A-Fa-f]+$/)
      expect(hexCheck.test(hash)).to.equal(true)
      hash.should.to.equal(mockData.abcHash)
    })
  })

  describe('logfile-creator', function () {
    it('shall create a logfile', function () {
      let logFileCreator = require(`../../../src/lib/logfile-creator`)(tmpDir)
      let abcHashPath = logFileCreator('abc')
      abcHashPath.should.be.a('string').that.does.include('/tmp/')
        .and.that.does.include('/0150983cd24fb0d6963f7d28e17f72')
        .and.that.does.include('/ba/')
        .and.that.does.include('_.log')
      assert(fs.existsSync(abcHashPath), 'logfile does not exists')
    })

    it('shall create a logfile with a different @extension', function () {
      let logFileCreator = require(`../../../src/lib/logfile-creator`)(tmpDir)
      let abcHashPath = logFileCreator('abc', '.js_')
      abcHashPath.should.be.a('string').that.does.include('/tmp/')
        .and.that.does.include('.js_')
    })
  })

  describe('plugin-loader', function () {
    it('shall test loading plugins passed as objects form the config', function () {
      let parameters = 'default'
      let calculatedParameters = require(`../../../src/app/configParser/configParser`)(parameters)
      calculatedParameters.plugins = [require(`../../../src/plugins/logDetails`)]
      require(`../../../src/app/container`)(calculatedParameters)
    })

    it('shall test loading plugins', function () {
      let parameters = 'default'
      let calculatedParameters = require(`../../../src/app/configParser/configParser`)(parameters)
      calculatedParameters.plugins = ['logDetails']
      require(`../../../src/app/container`)(calculatedParameters)
    })
  })
})
