// [require-a-lot] testRequires begin
const {
  capture, // reative path: ../lib/capture
  assert, // node module: assert
  requireALot, // The main library itself.
  path, // node module: path
  genericTextLinker, // generic-text-linker@1.6.39 | https://github.com/vidaxl-com/cowlog/tree/master/packages/generi...
}
// [require-a-lot] testRequires end
  = require('../../../../lib/requires')

describe('.log for ease of use', () => {
  it('tests .log', () => {
    const consoleOut = capture(() => requireALot(require)('../../../test-spec')
      .alias('test-spec', 'cc').log())
    assert(consoleOut.split('\n').length === 1, `${consoleOut.split('\n').length} --`)
  })

  it('tests .log(vertical)', () => {
    const consoleOut = capture(() => requireALot(require)('../../../test-spec', '../../../../../src')
      .alias('src', 'ral')
      .alias('test-spec', 'cc').log('vertical')())
    assert(consoleOut.split('\n').length === 4)
  })

  it('tests .log with .info', () => {
    const template = requireALot(require)('cowlog', 'chai')
      .from('chai', ['expect']).log.info.alias('cowlog', 'l')
    let result = null
    const output = capture(() => {result = template()})
    assert(output.includes('chai'))
    assert(output.includes('expect'))
    // assert(output.includes('homepage'))
    assert(result.expect)
  })

  it('tests .log .info .tag', () => {
    const template = requireALot(require)('cowlog', 'chai').from('chai', ['expect'])
      .log.info.tag('genericTestSuite').alias('cowlog', 'l')
    let result = null
    const output = capture(() => {result = template()})
    assert(output.includes('chai'))
    assert(output.includes('expect'))
    // assert(output.includes('homepage'))
    // assert(result.expect)
  })

  it('tests .log .info .tag', () => {
    const template = requireALot(require)('cowlog', 'chai').from('chai', ['expect'])
      .log.info.tag('genericTestSuite').alias('cowlog', 'l')
    let result = null
    const output = capture(() => {result = template()})
    assert(output.includes('chai'))
    assert(output.includes('expect'))
    // assert(output.includes('homepage'))
    // assert(result.expect)
  })
  const assetDir = path.join(__dirname, '../../../../assets')
  const requireALotInstance = require(path.join(assetDir, 'requires'))

  // l(requireDir(assetDir, {recurse: true})).keys()

  describe('.log asset tests', () => {
    it('tests .removeUnused', () => {
      requireALotInstance()
      const {linkerDir} = genericTextLinker
      const variables = ['requireALot', 'path']
      const definedVariables = linkerDir(assetDir,
        '// [require-a-lot] testAsset001 begin',
        '// [require-a-lot] testAsset001 end').split('\n').slice(1, -1)
      assert(variables.map(variable => definedVariables.toString().includes(variable)).reduce((result = true, currentValue) => result && currentValue))
      const numberOfDefinedVariables = 6
      const realLength = definedVariables.length
      assert(definedVariables.length === 6,
        {numberOgDefinedVariables: numberOfDefinedVariables, realLength})

      const libs = require(path.join(assetDir, 'requires'))
    })
  })

  describe('.container tests', () => {
    it('tests inline and rquired declatarions', () => {
      requireALotInstance('testAsset003')
      const shouldBetrue = require(path.join(assetDir, 'code003'))
      assert(shouldBetrue)
    })
  })

})
