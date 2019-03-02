module.exports = (curryCallbackObject, expect) => {
  describe('dsl-framework parameters', function () {
    it('checking with noPromises', function (done) {
      const dslFrameworkDefaultInstanceWithParameter = require('../../../src').noPromoises()
      dslFrameworkDefaultInstanceWithParameter((e, d) => {
        expect(d.data.returnArrayChunks[0][0]).to.equal('a')
        // l(d.data.returnArrayChunks)()
        done()
      }).a('b').c.d.e.f.g.h('i')
    })
    it('checking with noTriggerEndOfExecution', function (done) {
      const dslFrameworkDefaultInstanceWithParameter = require('../../../src').noTriggerEndOfExecution()
      let myDsl = dslFrameworkDefaultInstanceWithParameter((e, d) => {
        expect(d.data.returnArrayChunks[0][0]).to.equal('a')
        expect(d.data.returnArrayChunks[0][1]).to.equal('b')
        expect(d.data.returnArrayChunks[1][0]).to.equal('c')
        // l(d.data.returnArrayChunks)()
        done()
      })
      setTimeout(()=>{
        myDsl.a('b')
        setTimeout(()=>{
          myDsl.c
          setTimeout(()=>{
            myDsl()
          },0)
        },0)
      },0)
    })
  })
}
