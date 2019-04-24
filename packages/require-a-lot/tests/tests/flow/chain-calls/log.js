// [require-a-lot] testRequires begin
const {
  capture, //reative path: ../lib/capture
  assert, //node module: assert
  requireALot,
  requireDir,
  path, //node module: path
  genericTextLinker,
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

  describe('.log asset tests', () =>{
    it('tests .removeUnused', () => {
      requireDir(path.join(__dirname, '../../../assets'),{ recurse: true })
      const {linkerDir} = genericTextLinker
      const variables = ['requireALot', 'path']
      const definedVariables = linkerDir(path.join(__dirname, '../../../assets/001'),
        '// [require-a-lot] testAsset001 begin',
        '// [require-a-lot] testAsset001 end').split('\n').slice(1,-1)
      assert(variables.map(variable=>definedVariables.toString().includes(variable)).reduce((result=true, currentValue)=>result&&currentValue))
      assert(definedVariables.length === 2)
    })
  })

})
