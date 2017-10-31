/* eslint-env mocha */
// todo: extract
const assert = require('chai').assert
const testExec = require('./lib/external-test-executor')
const sslm = require('./lib/substing-to-line-mapper')
const stlc = require('./lib/string-to-line-increasing-checker')
const path = require('path')
const tmpDir = path.join(__dirname, '../tmp/')
const mockData = require('./mockData')

const appContainer = require('../dist/app/container')
appContainer['runtime-variables'].calculatedParameters = require('../src/app/configParser/configParser')()

const expect = require('chai').expect
require('chai').should()


describe('cowlog tests', function () {
  this.timeout(50000)
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
        let logFileCreator = require('../src/lib/logfile-creator')(tmpDir)
        let abcHashPath = logFileCreator('abc')
        abcHashPath.should.be.a('string').that.does.include('/tmp/')
          .and.that.does.include('/7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
          .and.that.does.include('/ba/')
          .and.that.does.include('_.log')
      })
    })
  })

  describe('cowlog functional tests', function () {
    let capturedText = ''

    const finishFunctionalTests = (done, text) => {
      capturedText = text
      done()
    }

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
    })

    afterEach(function () {
      basicOutputTests(capturedText)
    })

    it('show a @string', function (done) {
      testExec('basic-integer', function (output) {
        expect(output).to.be.a('string').that.does.include('"' + mockData.abcString + '"')
          .and.that.does.include('0 Beginnig ---')
          .and.that.does.include('0 End ---')
        finishFunctionalTests(done, output)
      })
    })

    it('and an @integer', function (done) {
      testExec('basic', function (output) {
        expect(output).to.be.a('string').that.does.include(mockData.testInt)
          .and.that.does.include('1 Beginnig ---')
          .and.that.does.include('1 End ---')
        finishFunctionalTests(done, output)
      })

    })

    it('and an @array', function (done) {
      testExec('basic-array', function (output) {
        expect(output).to.be.a('string').that.does.include(mockData.threeText)
          .and.that.does.include('2 Beginnig ---')
          .and.that.does.include('2 End ---')
          .and.that.does.include('[')
          .and.that.does.include(',')
          .and.that.does.include(']')
        finishFunctionalTests(done, output)
      })
    })

    it('and a @function', function (done) {
      testExec('basic-function', function (output) {
        expect(output).to.be.a('string').that.does.include(mockData.threeText)
          .and.that.does.include('3 Beginnig ---')
          .and.that.does.include('3 End ---')
          .and.that.does.include('function (')
          .and.that.does.include('return')
          .and.that.does.include('}')
          .and.that.does.include(']')
        finishFunctionalTests(done, output)
      })
    })

    it('and an object, but not the function', function (done) {
      testExec('basic-object', function (output) {
        expect(output).to.be.a('string').that.does.include(mockData.threeText)
          .and.that.does.include('a: "b"')
        finishFunctionalTests(done, output)
      })

    })

    it('different @object with a @function in it', function (done) {
      testExec('basic-object2', function (output) {
        expect(output).to.be.a('string').that.does.include(mockData.threeText)
          .and.that.does.include('fn: function (')
          .and.that.does.include('return')
          .and.that.does.include('+')
          .and.that.does.include('b')
          .and.that.does.include('}')
        finishFunctionalTests(done, output)
      })
    })

    it('tests @logf', function (done) {
      testExec('logf', function (output) {
        stlc(output, ['a Beginnig ---', mockData.abcString, 'a End ---', 'b Beginnig ---', mockData.threeText,
          'b End ---', 'undefined Beginnig ---', 11, 'undefined End ---'])
        expect(output).to.be.a('string').that.does.include('-')
        finishFunctionalTests(done, output)
      })

    })

    it('tests return', function (done) {
      testExec('return', function (output) {
        expect(output).to.be.a('string').that.does.include(mockData.abcString + 'z')
        finishFunctionalTests(done, output)
      })
    })

    it('testing @last feature', function (done) {
      testExec('last', function (output) {
        let abcLines = sslm(output, 'abc')
        let endLine = sslm(output, 'The following log entry is shown here because asked for it to show it again before the program exits')
        assert(abcLines.length == 2, "the 'abc' string shall be present in the output twice")
        assert(endLine > abcLines[0], 'the firts occurence shall be sooner than the process ending text')
        assert(endLine < abcLines[1], 'the second one shall occur after the process end test')

        expect(output).to.be.a('string').that.does.include('yay')
          .and.that.does.include('The following log entry is shown here because asked for it to show it again before the program exits')
          .and.that.does.include('yay')
        capturedText = output
        done()
      })

    })

    it('testing @lasts feature', function (done) {
      testExec('lasts', function (output) {
        let abcLines = sslm(output, 'abc')
        let endLine = sslm(output, 'The following log entry is shown here because asked for it to show it again before the program exits')
        assert(abcLines.length === 4, "the 'abc' string shall be present in the output twice " + abcLines.length)
        assert(endLine > abcLines[0] && endLine > abcLines[1], 'the firts occurence shall be sooner than the process ending text')
        assert(endLine < abcLines[2] && endLine < abcLines[3], 'the second one shall occur after the process end test')

        expect(output).to.be.a('string').that.does.include('yay')
          .and.that.does.include('The following log entry is shown here because asked for it to show it again before the program exits')
          .and.that.does.include('yay')
        finishFunctionalTests(done, output)
      })
    })

    it('testing @die', function (done) {
      testExec('die', function (output) {
        expect(output).to.be.a('string')
          .and.that.does.not.include('yay')
        finishFunctionalTests(done, output)
      })
    })
  })
})
