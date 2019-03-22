/* eslint-env mocha */
require('cowlog')()
const requireALot = require('../../src')
// [require-a-lot] testIncludes begin
const {
  capture, //reative path: ../lib/capture
  assert, //assert@1.4.1 | https://github.com/defunctzombie/commonjs-assert | commonjs assert - node.js api compatible
}
// [require-a-lot] testIncludes end
= require('../lib/requires')

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
      assert(!tst.cc)
      assert(tst['testSpec'])
    })

    it('want to multiple aliases to the same library (not a reat idea, but works)',() => {
      const tst = requireALot(require)('./test-spec').alias('test-spec','cc').alias('test-spec','ccc')()
      assert(tst.cc)
      assert(!tst.ccc)
    })

  })

  describe('.log for ease of use', () =>{
    it('tests .log',() => {
      const consoleOut = capture(()=> requireALot(require)('./test-spec')
        .alias('test-spec','cc').log())
      assert(consoleOut.split('\n').length === 1,`${consoleOut.split('\n').length} --`)
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
      const template = requireALot(require)('chai').from('chai',['expect']).hide('chai')
      const tst = template()
      assert(!tst.chai)
      assert(tst.expect)
    })

    it('tests .hide() with .log()',() => {
      const template = requireALot(require)('chai').from('chai',['expect']).hide('chai')('log')
      let result = null
      const output = capture(()=>{result = template()})
      assert(!output.includes('chai'))
      assert(output.includes('expec'))
      assert(result.expect)
    })
  })

  it('tests .log .info',() => {
    const template = requireALot(require)('cowlog','chai')
      .from('chai',['expect']).log.info.alias('cowlog', 'l')
    let result = null
    const output = capture(()=>{result = template()})
    assert(output.includes('chai'))
    assert(output.includes('expect'))
    // assert(output.includes('homepage'))
    assert(result.expect)
  })

  describe('testing .tag feature', ()=>{
    it('tests .log .info .tag',() => {
      const template = requireALot(require)('cowlog','chai').from('chai',['expect'])
        .log.info.tag("genericTestSuite").alias('cowlog', 'l')
      let result = null
      const output = capture(()=>{result = template()})
      assert(output.includes('chai'))
      assert(output.includes('expect'))
      // assert(output.includes('homepage'))
      // assert(result.expect)
    })

    it('tests .log .info .tag copying tags',() => {
//todo: fix a bit and write relevant tests
// [require-a-lot] genericTestSuite begin
const {
  ll, //*alias* of cowlog | cowlog@1.6.27 | https://github.com/vidaxl-com/cowlog/tree/master/packages/cowlog | Develo...
  chai, //chai@4.2.0 | http://chaijs.com | BDD/TDD assertion library for node.js and the browser. Test framework agno...
  expect, //*tag* of chai | chai@4.2.0 | http://chaijs.com | BDD/TDD assertion library for node.js and the browser. T...
}
// [require-a-lot] genericTestSuite end
        =
        requireALot(require)('cowlog','chai')
          .from('chai',['expect'])
          .log.info.tag("genericTestSuite")
          .alias('cowlog', 'll')
          .linkDirectory(__dirname)()

      const linkOrder = ['// [require-a-lot] genericTestSuite begin' ,'// [require-a-lot] genericTestSuite end']
      // const actualContent = linkerDir(__dirname,...linkOrder)
      // const actualContent = linkerDir(__dirname,'// [require-a-lot] genericTestSuite begin','// [require-a-lot] genericTestSuite end' )
      // const uu = linkerDir(__dirname,'// [require-a-lot] genericTestSuite begin','// [require-a-lot] genericTestSuite end' ,'aaa' )
      // l(actualContent, __dirname,'// [require-a-lot] genericTestSuite begin','// [require-a-lot] genericTestSuite end').lol.die()
      // linkerDir(__dirname,...linkOrder, actualContent[1])
    })
    // todo: test .removeUnused()
  })
})

module.exports=(parameter)=>parameter
