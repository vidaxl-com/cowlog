module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance, dslFramework) => {
  describe('return data consistency tests', function () {
    it('calling the same function multiple times',  function () {
      const fn = dslFrameworkDefaultInstance(
        (e, parameters) => {
          return parameters
        }
      )
      fn('a')('b')('c')()
      expect(fn('d')('e')('f')().data.returnArray().join('')).to.be.equal('def')
    })

    if(enviromentSupportsPromises) {
      const {callingSameCalls} =
        require('../promise-tests')
      callingSameCalls(expect, dslFrameworkDefaultInstance)
    }

    it('calling detached call', function (done) {
      const fn = dslFrameworkDefaultInstance(
        (e, parameters) => {
          done()
        }
      )
      fn('1')('2')(3)
      fn('4', 5)('6')('7')('8')
      fn('9')
    })
  })
}
