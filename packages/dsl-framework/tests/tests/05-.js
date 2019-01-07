module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFramework) => {
  describe('Testing the "argumnets" member of the DSL callback functions data parameter', function () {
    const example = dslFramework((e, d) => {
      return d
    })

    data = example.a.b('c').d('e','f').g('h','i').g('j','k')()

    it('casting parameter to booleand data', function () {
      expect(data.arguments('a', 'boolean')).to.be.equal(true)
      expect(data.arguments('c', 'boolean')).to.be.equal(false)
    })

    it('Getting the first argument of a once defined command.', function () {
      expect(data.arguments('a', 'firstArgument')).to.be.equal(undefined)
      expect(data.arguments('b', 'firstArgument')).to.be.equal('c')
      expect(data.arguments('d', 'firstArgument')).to.be.equal('e')
      expect(data.arguments('g', 'firstArgument')).to.be.equal('h')
    })

    it('Getting the arguments of the first command.', function () {
      expect(data.arguments('d', 'firstEntry')).to.include('e').and.to.include('f');
    })

    it('Getting the arguments for a once called command.', function () {
      const allEntriesTestDataOnceDefined = data.arguments('d', 'allEntries')
      expect(allEntriesTestDataOnceDefined).to.be.an('array').that.includes.an('array')
      expect(allEntriesTestDataOnceDefined[0]).to.include('e').and.to.include('f');
    })

    it('Getting the arguments for a more called command.', function () {
      const allEntriesTestDataMoreDefined = data.arguments('g', 'allEntries')
      expect(allEntriesTestDataMoreDefined).to.be.an('array').that.includes.an('array')
      expect(allEntriesTestDataMoreDefined[0]).to.include('h').and.to.include('i');
      expect(allEntriesTestDataMoreDefined[1]).to.include('j').and.to.include('k');
    })

    it('different ways of getting patrameters for the return object.', function () {
      expect(data.arguments('a', 'allEntries')[0].length).to.be.equal(0)
    })
  })
}
