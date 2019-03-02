module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance, dslFramework) => {
  describe('commandParser Tests', function () {
    const example = dslFrameworkDefaultInstance((e, d) => {
      return d
    })

    data = example.a.b('c').d('e','f').g('h','i').g('j','k')()

    it('testing with real commands', function () {
      expect(data.arguments('g', 'lastEntry')).to.include('j')
      expect(data.arguments('g', 'firstEntry')).to.include('h')
      expect(data.arguments('g', 'firstArgument')).to.equal('h')
      expect(data.arguments('g', 'lastArgument')).to.equal('j')
    })

    it('testing with real commands', function () {
      let commandParser = require('../../../src/core/unlimited-curry-factory/get-command-arguments/commandParser')
      const baseArray = ['a', 'b', 'c']
      expect(commandParser(baseArray, 'lastEntry')).to.include('b').and.to.include('c')
      expect(commandParser([baseArray], 'lastEntry')).to.include('b').and.to.include('c')
    })

  })
}
