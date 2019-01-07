module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFramework, abcTester) => {
  describe('callback tests', function () {
    it('tests if callback version is a function and callback parameter 2 is an object', function () {
      expect(dslFramework()((e, d) => {
      })).to.be.a('function')
    })

    it('tests if callback is called', function (done) {
      const fn = dslFramework((e, d) => {
        done()
      })
      fn('a')()
    })

    it('tests if callback gets the parameters', function (done) {
      dslFramework((e, d) => {
        abcTester(d)
        done()
      })('a')('b')('c')()
    })

    it('tests if callback gets the parameters false', function (done) {
      dslFramework((e, d) => {
        expect(d.data.returnArray[0]).to.be.equal(false)
        done()
      })(false)()
    })

    it('tests if callback carried out (once only) on a detached state (no return value obviously)', function (done) {
      const fn = dslFramework((e, d) => {
        done()
      })
      fn('a')('b')('c')
    })

    if(enviromentSupportsPromises)
    {
      const {testsPromistesIfCallbackVersionReturningPromiseGivesBackTheParametersProvidedTwo,
        testingReturnedProcessedDataPromise} =
        require('./promise-tests')
      testsPromistesIfCallbackVersionReturningPromiseGivesBackTheParametersProvidedTwo(expect, dslFramework, abcTester)
      testingReturnedProcessedDataPromise(expect, dslFramework)
    }

    it('testing sync returned processed data', function () {
      const fn = dslFramework(
        (e, parameters) => parameters.data.returnArray.join('')
      )
      const returnValue = fn('a')('b')('c')()
      expect(returnValue).to.be.equal('abc')
    })

    it('tests if callback split calls', function () {
      const getMyCurry = () => dslFramework(
        (e, parameters) => parameters.data.returnArray[0]
          + parameters.data.returnArray[1]
          + parameters.data.returnArray[2]
      )
      let fn = getMyCurry()
      fn('a')
      let returnValue = fn('b', 'c')()
      expect(returnValue).to.be.equal('abc')

      fn = getMyCurry()
      fn('a', 'b')
      returnValue = fn('c')()
      expect(returnValue).to.be.equal('abc')

      fn = getMyCurry()
      fn('a')
      fn('b')
      returnValue = fn('c')()
      expect(returnValue).to.be.equal('abc')
    })

    it('tests if callback version multiple currying', function (done) {
      const fn = dslFramework(
        (e, parameters) => {
          done()
          return parameters
        }
      )
      fn('a')('b')('c')()
    })

  })

}
