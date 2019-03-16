/* eslint-env mocha */
require('cowlog')()
// const {expect} = require('chai')
const requireALot = require('../../src')
const assert = require('assert')
const capture = require('../lib/capture')

describe('Basic Test Suite', function () {

  it('basic usecase', function () {
    const tst = requireALot(require)('camelcase', 'chai', 'license-checker', './test-spec')()
    Object.keys(tst).map(value=>!!value).forEach(value=>assert(value))
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

    it('want to multiple aliases to the same library (not a reat idea, but works)',() => {
      const tst = requireALot(require)('./test-spec').alias('test-spec','cc').alias('test-spec','ccc')()
      assert(tst.cc)
      assert(tst.ccc)
    })

  })

  describe('.log for ease of use', () =>{
    it('tests .log',() => {
      const consoleOut = capture(()=> requireALot(require)('./test-spec')
        .alias('test-spec','cc').log())
      assert(consoleOut.split('\n').length === 1)
    })

    it('tests .log(vertical)',() => {
      const consoleOut = capture(()=> requireALot(require)('./test-spec', '../../src')
        .alias('src','ral')
        .alias('test-spec','cc').log('vertical')())
      assert(consoleOut.split('\n').length === 4)
    })
  })

  describe('.from', () =>{
    it('tests .from()',() => {
      const tst = requireALot(require)('chai').from('chai',['expect'])()
      assert(tst.chai)
      assert(tst.expect)
    })
  })

  describe('.hide', () =>{
    it('tests .hide()',() => {
      const tst = requireALot(require)('chai').from('chai',['expect']).hide('chai')()
      assert(!tst.chai)
      assert(tst.expect)
    })
  })

})

module.exports=(parameter)=>parameter
