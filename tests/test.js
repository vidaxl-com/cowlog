/* eslint-env mocha */
// todo: extract
const assert = require('chai').assert
const shell = require('shelljs')
const fs = require('fs')
const sslm = require('./lib/substing-to-line-mapper')
const stlc = require('./lib/string-to-line-increasing-checker')
const bufferFile = 'tmp/buffer'
const path = require('path')
const tmpDir = path.join(__dirname, '../tmp/')
const abcHash = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
const abcString = 'abc'
const testInt = 1337
const threeText = 'three'
const testArray = [1, 2, threeText]
const testFunction = function (a, b) {
  return a + b
}

const testObject1 = {
  a: 'b'
}

const testObject2 = {
  c: 1,
  fn: testFunction
}

const appContainer = require('../app/container')
appContainer['runtime-variables'].calculatedParameters = require('../app/configParser')()

const expect = require('chai').expect
require('chai').should()
describe('lib tests', function () {
  this.timeout(50000);
  describe('hash-creator', function () {
    it('shall provide a hash', function () {
      let hashCreator = appContainer['hash-creator']
      let hash = hashCreator('abc')
      hash.should.be.a('string')
      var hexCheck = new RegExp(/^[0-9A-Fa-f]+$/)
      expect(hexCheck.test(hash)).to.equal(true)
      hash.should.to.equal(abcHash)
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
      assertCounter.expect(10)
      expect(capturedText).to.be.a('string').that.does.include('"' + abcString + '"')
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
      assertCounter.assert()
      stlc(capturedText, ['________________', '"' + abcString + '"', '_-_-_-_-_-_-_-_-_-_-_-_', 'called from:',
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

      cowlog.log(abcString)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include('"' + abcString + '"')
        .and.that.does.include('0 Beginnig ---')
        .and.that.does.include('0 End ---')
    })

    it(' and an integer', function () {
      cowlog.log(abcString, testInt)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(testInt)
        .and.that.does.include('1 Beginnig ---')
        .and.that.does.include('1 End ---')
    })

    it('and an array', function () {
      cowlog.log(abcString, testInt, testArray)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(threeText)
        .and.that.does.include('2 Beginnig ---')
        .and.that.does.include('2 End ---')
        .and.that.does.include('[')
        .and.that.does.include(',')
        .and.that.does.include(']')
    })

    it('and a function', function () {
      cowlog.log(abcString, testInt, testArray, testFunction)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(threeText)
        .and.that.does.include('3 Beginnig ---')
        .and.that.does.include('3 End ---')
        .and.that.does.include('function (')
        .and.that.does.include('return')
        .and.that.does.include('}')
    })

    it('and an object, but not the function', function () {
      cowlog.log(abcString, testInt, testArray, testObject1)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(threeText)
        .and.that.does.include('a: "b"')
    })

    it('different object with a function in it', function () {
      cowlog.log(abcString, testInt, testArray, testObject2)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(threeText)
        .and.that.does.include('fn: function (')
        .and.that.does.include('return')
        .and.that.does.include('+')
        .and.that.does.include('b')
        .and.that.does.include('}')
    })

    it('tests logf', function () {
      cowlog.logf(testFunction, abcString, threeText, 11)
      unhookIntercept()

      console.log(capturedText)

      stlc(capturedText, ['a Beginnig ---', abcString, 'a End ---', 'b Beginnig ---',threeText, 'b End ---',
        'undefined Beginnig ---', 11, , 'undefined End ---'])

      expect(capturedText).to.be.a('string').that.does.include('-')
    })

    it('testing last feature', function () {
      shell.exec(`node_modules/.bin/nyc --reporter=lcov node tests/external-tests/last-test.js > ` + bufferFile)
      capturedText = fs.readFileSync(bufferFile, 'utf8')

      let abcLines = sslm(capturedText, 'abc')
      let endLine = sslm(capturedText, 'The following log entry is shown here because asked for it to show it again before the program exits')

      assert(abcLines.length === 2, "the 'abc' string shall be present in the output twice")
      assert(endLine > abcLines[0], 'the firts occurence shall be sooner than the process ending text')
      assert(endLine < abcLines[1], 'the second one shall occur after the process end test')

      expect(capturedText).to.be.a('string').that.does.include('yay')
        .and.that.does.include('The following log entry is shown here because asked for it to show it again before the program exits')
        .and.that.does.include('yay')
    })

    it('testing lasts feature', function () {
      shell.exec(`node_modules/.bin/nyc --reporter=lcov node tests/external-tests/lasts-test.js > ` + bufferFile)
      capturedText = fs.readFileSync(bufferFile, 'utf8')

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
      shell.exec(`node_modules/.bin/nyc --reporter=lcov node tests/external-tests/die-test.js > ` + bufferFile)
      capturedText = fs.readFileSync(bufferFile, 'utf8')

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
