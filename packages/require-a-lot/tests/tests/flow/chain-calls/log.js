// [require-a-lot] testRequires begin
const {
  capture, //reative path: ../lib/capture
  assert, //node module: assert
  requireALot,
}
// [require-a-lot] testRequires end
= require('../../../lib/requires')


describe('.log for ease of use', () =>{
  it('tests .log',() => {
    const consoleOut = capture(()=> requireALot(require)('../../test-spec')
      .alias('test-spec','cc').log())
    assert(consoleOut.split('\n').length === 1,`${consoleOut.split('\n').length} --`)
  })

  it('tests .log(vertical)',() => {
    const consoleOut = capture(()=> requireALot(require)('../../test-spec', '../../../../src')
      .alias('src','ral')
      .alias('test-spec','cc').log('vertical')())
    assert(consoleOut.split('\n').length === 4)
  })

  it('tests .log with .info',() => {
    const template = requireALot(require)('cowlog','chai')
      .from('chai',['expect']).log.info.alias('cowlog', 'l')
    let result = null
    const output = capture(()=>{result = template()})
    assert(output.includes('chai'))
    assert(output.includes('expect'))
    // assert(output.includes('homepage'))
    assert(result.expect)
  })

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
  ll, //*alias* of cowlog | cowlog@1.6.32 | https://github.com/vidaxl-com/cowlog/tree/master/packages/cowlog | Develo...
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


})
