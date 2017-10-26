/* eslint-env mocha */
// todo: extract
const assert = require('chai').assert
const exec = require('sync-exec')
const fs = require('fs')
const sslm = require('./lib/substing-to-line-mapper')
const stlc = require('./lib/string-to-line-increasing-checker')
const bufferFile = 'tmp/buffer'
const path = require('path')
const tmpDir = path.join(__dirname, '../tmp/')
const mockData = require('./mockData')

const appContainer = require('../app/container')
appContainer['runtime-variables'].calculatedParameters = require('../app/configParser')()
const cowlog = appContainer.cowlog()

const expect = require('chai').expect
require('chai').should()
describe('lib tests', function () {
  this.timeout(50000)
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
      let logFileCreator = require('../lib/logfile-creator')(tmpDir)
      let abcHashPath = logFileCreator('abc')
      abcHashPath.should.be.a('string').that.does.include('/tmp/')
        .and.that.does.include('/7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
        .and.that.does.include('/ba/')
        .and.that.does.include('_.log')
    })
  })

  describe('cowlog', function () {
    let intercept = null
    let capturedText = ''
    let unhookIntercept = null

    const basicOutputTests = function (capturedText) {
      expect(capturedText).to.be.a('string').that.does.include('"' + mockData.abcString + '"')
        .and.that.does.include('Beginnig ---')
        .and.that.does.include('End ---')

        .and.that.does.include('called from:')

        .and.that.does.include('_-_-_-_-_-_-_-_-_-_-_-_')
        .and.that.does.include('stack trace:')
        .and.that.does.include('session log:')
        .and.that.does.include('logged at:')
        .and.that.does.include('______________')
        .and.that.does.include('--------------')
        .and.that.does.include('test.js:')
      stlc(capturedText, ['________________', '"' + mockData.abcString + '"', '_-_-_-_-_-_-_-_-_-_-_-_', 'called from:',
        'stack trace:', 'session log:', 'logged at:', '-----------------------'])
    }

    beforeEach(function () {
      capturedText = ''
      intercept = require('intercept-stdout')
      unhookIntercept = intercept(function (txt) {
        capturedText += txt
      })
    })

    afterEach(function () {
      basicOutputTests(capturedText)
    })

    it('show a sting', function () {
      cowlog.log(mockData.abcString)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include('"' + mockData.abcString + '"')
        .and.that.does.include('0 Beginnig ---')
        .and.that.does.include('0 End ---')
    })

    it(' and an integer', function () {
      cowlog.log(mockData.abcString, mockData.testInt)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(mockData.testInt)
        .and.that.does.include('1 Beginnig ---')
        .and.that.does.include('1 End ---')
    })

    it('and an array', function () {
      cowlog.log(mockData.abcString, mockData.testInt, mockData.testArray)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(mockData.threeText)
        .and.that.does.include('2 Beginnig ---')
        .and.that.does.include('2 End ---')
        .and.that.does.include('[')
        .and.that.does.include(',')
        .and.that.does.include(']')
    })

    it('and a function', function () {
      cowlog.log(mockData.abcString, mockData.testInt, mockData.testArray, mockData.testFunction)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(mockData.threeText)
        .and.that.does.include('3 Beginnig ---')
        .and.that.does.include('3 End ---')
        .and.that.does.include('function (')
        .and.that.does.include('return')
        .and.that.does.include('}')
    })

    it('and an object, but not the function', function () {
      cowlog.log(mockData.abcString, mockData.testInt, mockData.testArray, mockData.testObject1)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(mockData.threeText)
        .and.that.does.include('a: "b"')
    })

    it('different object with a function in it', function () {
      cowlog.log(mockData.abcString, mockData.testInt, mockData.testArray, mockData.testObject2)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(mockData.threeText)
        .and.that.does.include('fn: function (')
        .and.that.does.include('return')
        .and.that.does.include('+')
        .and.that.does.include('b')
        .and.that.does.include('}')
    })

    it('tests logf', function () {
      cowlog.logf(mockData.testFunction, mockData.abcString, mockData.threeText, 11)
      unhookIntercept()
      stlc(capturedText, ['a Beginnig ---', mockData.abcString, 'a End ---', 'b Beginnig ---', mockData.threeText,
        'b End ---', 'undefined Beginnig ---', 11, 'undefined End ---'])
      expect(capturedText).to.be.a('string').that.does.include('-')
    })

    it('tests return', function () {
      let eleven = cowlog.log(mockData.testFunction, mockData.abcString, mockData.threeText, 11)('return')
      unhookIntercept()
      assert(eleven === 11, 'ELEVEN')
    })

    it('testing last feature', function () {
      let out = exec(`node_modules/nyc/bin/nyc.js --reporter=lcov node tests/external-tests/last-test.js `)
      console.log(out)
      capturedText = out.stdout
      let abcLines = sslm(capturedText, 'abc')
      let endLine = sslm(capturedText, 'The following log entry is shown here because asked for it to show it again before the program exits')
      console.log(abcLines,'abcLines')
      assert(abcLines.length == 2, "the 'abc' string shall be present in the output twice")
      assert(endLine > abcLines[0], 'the firts occurence shall be sooner than the process ending text')
      assert(endLine < abcLines[1], 'the second one shall occur after the process end test')

      expect(capturedText).to.be.a('string').that.does.include('yay')
        .and.that.does.include('The following log entry is shown here because asked for it to show it again before the program exits')
        .and.that.does.include('yay')
    })

    it('testing lasts feature', function () {
      let out = exec(`node_modules/nyc/bin/nyc.js --reporter=lcov node tests/external-tests/lasts-test.js`)
      console.log(out)
      capturedText = out.stdout
      let abcLines = sslm(capturedText, 'abc')
      let endLine = sslm(capturedText, 'The following log entry is shown here because asked for it to show it again before the program exits')
      assert(abcLines.length === 4, "the 'abc' string shall be present in the output twice")
      assert(endLine > abcLines[0] && endLine > abcLines[1], 'the firts occurence shall be sooner than the process ending text')
      assert(endLine < abcLines[2] && endLine < abcLines[3], 'the second one shall occur after the process end test')

      expect(capturedText).to.be.a('string').that.does.include('yay')
        .and.that.does.include('The following log entry is shown here because asked for it to show it again before the program exits')
        .and.that.does.include('yay')
    })

    it('testing lasts feature', function () {
      let out = exec(`node_modules/nyc/bin/nyc.js --reporter=lcov node tests/external-tests/die-test.js`)
      console.log(out)
      capturedText = out.stdout
      let abcLines = sslm(capturedText, 'abc')
      let endLine = sslm(capturedText, 'The following log entry is shown here because asked for it to show it again before the program exits')
      assert(abcLines.length === 4, "the 'abc' string shall be present in the output twice")
      assert(endLine > abcLines[0] && endLine > abcLines[1], 'the firts occurence shall be sooner than the process ending text')
      assert(endLine < abcLines[2] && endLine < abcLines[3], 'the second one shall occur after the process end test')

      expect(capturedText).to.be.a('string')
        .that.does.include('The following log entry is shown here because asked for it to show it again before the program exits')
        .and.that.does.not.include('yay')
    })
  })
})
