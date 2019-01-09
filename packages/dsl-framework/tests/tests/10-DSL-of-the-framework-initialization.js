module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFramework) => {
  describe('Dsl of the framework initialization', function () {
    describe('commandParser Tests', function () {
      it('testing with real commands', function () {
        const example = dslFramework((e, d) => {
          return d
        })
        const data = example.a.b('c').d('e','f').g('h','i').g('j','k')()
        expect(data.arguments('g', 'lastEntry')).to.include('j')
        expect(data.arguments('g', 'firstEntry')).to.include('h')
        expect(data.arguments('g', 'firstArgument')).to.equal('h')
        expect(data.arguments('g', 'lastArgument')).to.equal('j')
      })
    })
  })
}
