const assert = require('assert')
module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance, dslFramework) => {
  describe('arguments tests', function () {
    const example = dslFrameworkDefaultInstance((e, d) => {
      return d
    })

    const data = example.a.b('c').d('e', 'f').g('h', 'i').g('j', 'k')()

    it('testing .arguments with a simple string as a command', function () {
      expect(data.arguments('g', 'lastEntry')).to.include('j')
      expect(data.arguments('g', 'firstEntry')).to.include('h')
      expect(data.arguments('g', 'firstArgument')).to.equal('h')
      expect(data.arguments('g', 'lastArgument')).to.equal('j')
    })

    it('testing .arguments with a simple string as a command', function () {
      assert.deepEqual(data.arguments(['g', 'd', 'c']), [[['h', 'i'], ['j', 'k']], [['e', 'f']], false])
      assert.deepEqual(data.arguments(['g', 'd', 'c'], 'lastEntry'), [['j', 'k'], ['e', 'f'], false])
    })

    it('testing with real commands', function () {
      let commandParser = require('../../../src/core/unlimited-curry-factory/arguments/commandParser')
      const baseArray = ['a', 'b', 'c']
      expect(commandParser(baseArray, 'lastEntry')).to.include('b').and.to.include('c')
      expect(commandParser([baseArray], 'lastEntry')).to.include('b').and.to.include('c')
    })

  })
}
