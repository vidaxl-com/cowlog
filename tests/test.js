/* eslint-env mocha */
const path = require('path')
const tmpDir = path.join(__dirname, '../tmp/')
const abcHash = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
const abcString = 'abc'
const testInt = 1337
const threeText = 'three'
const testArray = [1, 2, threeText]
const testFunction = function (a, b) {
  return a + b
};

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
      let cowlog = appContainer.cowlog()
      cowlog.log(abcString)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include('"' + abcString + '"')
        .and.that.does.include('0 Beginnig ---')
        .and.that.does.include('0 End ---')
    })

    it(' and an integer', function () {
      let cowlog = appContainer.cowlog()
      cowlog.log(abcString, testInt)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(testInt)
        .and.that.does.include('1 Beginnig ---')
        .and.that.does.include('1 End ---')
    })

    it('and an array', function () {
      let cowlog = appContainer.cowlog()
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
      let cowlog = appContainer.cowlog()
      cowlog.log(abcString, testInt, testArray, testFunction)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(threeText)
        .and.that.does.include('3 Beginnig ---')
        .and.that.does.include('3 End ---')
        .and.that.does.include('function (a, b) {')
        .and.that.does.include('return a + b')
        .and.that.does.include('}')
    })

    it('and an object, but not the function', function () {
      let cowlog = appContainer.cowlog()
      cowlog.log(abcString, testInt, testArray, testObject1)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(threeText)
        .and.that.does.include('a: "b"')
    })

    it('different object with a function in it', function () {
      let cowlog = appContainer.cowlog()
      cowlog.log(abcString, testInt, testArray, testObject2)
      unhookIntercept()

      expect(capturedText).to.be.a('string').that.does.include(threeText)
        .and.that.does.include('fn: function (a, b) { ')
        .and.that.does.include('return a + b')
        .and.that.does.include('}')
    })

  })
})
