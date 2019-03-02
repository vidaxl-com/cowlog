module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance, dslFramework) => {
  describe('factory functionality', function () {
    describe('basic usage', function () {
      it('.', function () {

        const example = dslFramework().factory((e,d)=>{

        })

        //   dslFrameworkDefaultInstance((e, d) => {
        //   return d
        // })
        // const data = example.a.b('c').d('e','f').g('h','i').g('j','k')()
        //
        // let example2 = dslFrameworkDefaultInstance((e, d) => {
        //   return d
        // })
        // const data2 = data.data.repeateMe(example2)//()() see below the explanation
        //                                            // this first call prepares the data
        //                                            // the return of this call  is the example2
        //                                             ()
        //                                             // So you can do with it whatever you want with your dsl magic.
        //                                             // Until finally you call it and receive your own data.
        //                                             ()
        //
        // expect(data.data.returnArrayChunks).to.deep.equal(data2.data.returnArrayChunks)
      })
    })
  })
}
