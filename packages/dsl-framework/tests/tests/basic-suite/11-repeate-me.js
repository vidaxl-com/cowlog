module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance, dslFramework) => {
  describe('repeate me functionality', function () {
    describe('commandParser Tests', function () {
      it('testing with real commands', function () {
        const example = dslFrameworkDefaultInstance((e, d) => {
          return d
        })
        const data = example.a.b('c').d('e','f').g('h','i').g('j','k')()

        let example2 = dslFrameworkDefaultInstance((e, d) => {
          return d
        })
        const data2 = data.data.repeate.me(example2)()

        expect(data.data.returnArrayChunks).to.deep.equal(data2.data.returnArrayChunks)
      })
    })
  })
}
