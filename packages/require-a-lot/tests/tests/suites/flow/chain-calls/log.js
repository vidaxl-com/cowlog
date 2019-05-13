// [require-a-lot] testRequires begin
const {
  capture, // *file path*: ../lib/capture |
  assert, // *node module*: assert | https://nodejs.org/api/assert.html |
  requireALot, //  The main library itself. |
  path, // *node module*: path | https://nodejs.org/api/path.html |
  genericTextLinker, // generic-text-linker@1.6.41 | https://github.com/vidaxl-com/cowlog/tree/master/packages/generi...
  executeIfNycIsOff, // *di service* | Executes function if nyc is not running, technically if the test-dev script is...
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
    executeIfNycIsOff(() => {
      it('tests inline and rquired declatarions', () => {
        requireALotInstance()
        const shouldBetrue = require(path.join(assetDir, 'code003'))
        assert(shouldBetrue)
      })
      it('tests no dependency array declaration', () => {
        let shouldBetrue = require(path.join(assetDir, 'code004'))
        assert(shouldBetrue)
        shouldBetrue = require(path.join(assetDir, 'code005'))
        assert(shouldBetrue)
        shouldBetrue = require(path.join(assetDir, 'code006'))
        assert(shouldBetrue)
      })
    })

    it('tests autmatic parameter fetching form the container', () => {
      const shouldBetrue = require(path.join(assetDir, 'code007'))
      assert(shouldBetrue)
    })
    it('tests service having a factory as parameter', () => {
      const container = requireALotInstance()
      // it will generate a new numner all the time so the equalation sould not be equal to 0.
      assert(
        ((container.somethingComplex5 - container.somethingComplex5) +
          (container.somethingComplex5 - container.somethingComplex5) +
          (container.somethingComplex5 - container.somethingComplex5)) !== 0
      )
    })

  })
})
