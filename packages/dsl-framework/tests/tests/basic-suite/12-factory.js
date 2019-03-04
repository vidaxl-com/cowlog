module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance, dslFramework) => {
  describe('factory functionality', function () {
    describe('basic usage', function () {
      it('.Testing the factory', function () {

        const repeater = (inctance = false) => sample.data.repeate.me(instanceFactory(inctance))
        const instanceFactory = (instance)=>instance?instance:dslFramework()((e,d)=>{
          const {data} = d
          // l(returnArrayChunks, data, repeate.me)()
          return data.returnArray()
        })

        const sample = dslFrameworkDefaultInstance()('a').b.c()

        // let result = repeater(sample, repeater)
        let result = repeater()

        result.e('f', 'make an actual feature form it')
        // l(result())()

        result = repeater(result)

        // const factory = dslFrameworkDefaultInstance()('a').b.c().data.repeate.me(frmwrk)
        // const f1 = factory()
        // const f2 = factory()
        // factory();factory();factory()
        // l(f1())()
        // l(result())()
      })
    })
  })
}
