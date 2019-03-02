module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFramework) => {
  describe('repeate me functionality', function () {
    describe('commandParser Tests', function () {
      it('testing with real commands', function () {
        const example = dslFramework((e, d) => {
          return d
        })
        const data = example.a.b('c').d('e','f').g('h','i').g('j','k')()

        let example2 = dslFramework((e, d) => {
          return d
        })
        const data2 = data.data.repeateMe(example2)//()() see below the explanation
                                                   // this first call prepares the data
                                                   // the return of this call  is the example2
                                                    ()
                                                    // So you can do with it whatever you want with your dsl magic.
                                                    // Until finally you call it and receive your own data.
                                                    ()

        expect(data.data.returnArrayChunks).to.deep.equal(data2.data.returnArrayChunks)
      })
    })
  })
}
