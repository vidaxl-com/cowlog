/* eslint-env mocha */
require('cowlog')()
const {expect} = require('chai')
const requireALot = require('../../src')
const assert = require('assert')
const capture = require('../lib/capture')

describe('Basic Test Suite', function () {

  it('basic usecase', function () {
    const tst = requireALot(require)('camelcase', 'chai', 'license-checker', './test-spec')()
    Object.keys(tst).map(value=>!!value).forEach(value=>expect(value).to.equal(true))
  })

  describe('.as functionality', () =>{
    it('default behaviour',() => {
      const tst = requireALot(require)('./test-spec').alias('test-spec','cc')()
      assert(tst.cc)
      assert(!tst['testSpec'])
    })

    it('does not exists the alias',() => {
      const tst = requireALot(require)('./test-spec').alias('this-does-not-exists','cc')()
      assert(!tst.ccc)
      assert(tst['testSpec'])
    })

    it('want to multiple aliases to the same library (only the first alias gets evaluated)',() => {
      const tst = requireALot(require)('./test-spec').alias('test-spec','cc').alias('test-spec','ccc')()
      assert(tst.cc)
      assert(!tst.ccc)
    })

  })

  describe('.log for ease of use', () =>{
    it('tests .log',() => {
      const consoleOut = capture(()=> requireALot(require)('./test-spec')
        .alias('test-spec','cc').log())
      l(consoleOut)()
      assert(consoleOut.split('\n').length === 1)
      // assert(JSON.parse(consoleOut))
    })

    it('tests .log(vertical)',() => {

      const consoleOut = capture(()=> requireALot(require)('./test-spec', '../../src')
        .alias('src','ral')
        .alias('test-spec','cc').log('vertical')())
      assert(consoleOut.split('\n').length === 4)
    })

  })
})

module.exports=(parameter)=>parameter
