const assert = require('chai').assert
const path = require('path')
const tmpDir = path.join(__dirname, '../tmp/')
const mockData = require('./mockData')
var fs = require('fs');
let sourcePath = ''
process.env.PROD ? sourcePath = 'dist' : sourcePath = 'src'
const appContainer = require(`../${sourcePath}/app/container`)()

const expect = require('chai').expect
require('chai').should()

describe('lib unit tests', function () {
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
      let logFileCreator = require(`../${sourcePath}/lib/logfile-creator`)(tmpDir)
      let abcHashPath = logFileCreator('abc')
      abcHashPath.should.be.a('string').that.does.include('/tmp/')
        .and.that.does.include('/7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
        .and.that.does.include('/ba/')
        .and.that.does.include('_.log')
      assert(fs.existsSync(abcHashPath), "logfile does not exists")
    })

    it('shall create a logfile with a different @extension', function () {
      let logFileCreator = require(`../${sourcePath}/lib/logfile-creator`)(tmpDir)
      let abcHashPath = logFileCreator('abc','.js')
      abcHashPath.should.be.a('string').that.does.include('/tmp/')
        .and.that.does.include('.js')
    })

  })
})
