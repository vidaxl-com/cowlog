/* eslint-env mocha */
// require('cowlog')()
const expect = require('chai').expect
const dslFramework = require('../../src')()
const enviromentSupportsPromises =  require('semver').satisfies(process.version, '>6.x')
const assert = require('assert')

const abcTester = function(abcData){
  expect(abcData.data.returnArray.join('')).to.be.equal('abc')
}

describe('Basic Test Suite', function () {
  const curryString = 'Hey'
  const uCurryBuilder = dslFramework()
  const curryObject = uCurryBuilder(1, 2, 3, 4, 5)('a', curryString, 'c')()
  const curryCallbackObject = uCurryBuilder(() => {})

  it('basic test without callback', function () {
    expect(dslFramework).to.be.an('function')
    expect(curryObject).to.be.an('object').that.have.all.keys('data', 'getFrom', 'command', 'arguments', 'commandSequence')
  })

  it('tests a', function () {
    expect(curryCallbackObject).to.be.a('function')
  })

  require('./01-return-tests-no-callback')(curryCallbackObject, expect, enviromentSupportsPromises, dslFramework, curryString, curryObject)
  require('./02-callback-tests')(curryCallbackObject, expect, enviromentSupportsPromises, dslFramework, abcTester)
  require('./03-return-data-consistency')(curryCallbackObject, expect, enviromentSupportsPromises, dslFramework)

  describe('More Dsl related functionalities.', function () {
    require('./04-DSL-chaining')(curryCallbackObject, expect, enviromentSupportsPromises, dslFramework, abcTester)
    require('./05-')(curryCallbackObject, expect, enviromentSupportsPromises, dslFramework)
    require('./06-command-sequence')(curryCallbackObject, expect, enviromentSupportsPromises, dslFramework, assert)
    require('./07-command-parser')(curryCallbackObject, expect, enviromentSupportsPromises, dslFramework)
  })

  describe('Dsl of the framework initialization', function () {
    describe('commandParser Tests', function () {
      it('testing with real commands', function () {
        expect(data.arguments('g', 'lastEntry')).to.include('j')
        expect(data.arguments('g', 'firstEntry')).to.include('h')
        expect(data.arguments('g', 'firstArgument')).to.equal('h')
        expect(data.arguments('g', 'lastArgument')).to.equal('j')
      })
    })
  })

  describe('dsl-framework parameters', function () {
    it('checking with noPromises', function (done) {
      const dslFrameworkWithParameter = require('../../src').noPromoises()
      dslFrameworkWithParameter((e, d) => {
        expect(d.data.returnArrayChunks[0][0]).to.equal('a')
        // l(d.data.returnArrayChunks)()
        done()
      }).a('b').c.d.e.f.g.h('i')
    })
    it('checking with noTriggerEndOfExecution', function (done) {
      const dslFrameworkWithParameter = require('../../src').noTriggerEndOfExecution()
      let myDsl = dslFrameworkWithParameter((e, d) => {
        expect(d.data.returnArrayChunks[0][0]).to.equal('a')
        expect(d.data.returnArrayChunks[0][1]).to.equal('b')
        expect(d.data.returnArrayChunks[1][0]).to.equal('c')
        // l(d.data.returnArrayChunks)()
        done()
      })
      setTimeout(()=>{
        myDsl.a('b')
        setTimeout(()=>{
          myDsl.c
          setTimeout(()=>{
            myDsl()
          },0)
        },0)
      },0)
    })
  })
})
