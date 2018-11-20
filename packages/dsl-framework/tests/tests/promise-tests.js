module.exports= {
  "testsPomiseMagic": function(expect, curryCallbackObject, unlimitedCurry, curryString){
    it('tests promise magic', function () {
      Promise.resolve(async function(){
        parametersImmediateAsReference = curryCallbackObject('a')(curryString).data
        parametersNoCallbackPromiseReturn = await unlimitedCurry('just a placeholder ' +
          'not function type anything so not callback applied, ' +
          'but the rest is done')('a', curryString)().then((d)=>d)
        parametersCallbackPromise = await unlimitedCurry(()=>{})('a', curryString)().then((d)=>d)
        expect(parametersImmediateAsReference.toString()).to.be.equal(parametersNoCallbackPromiseReturn.toString())
        expect(parametersImmediateAsReference.toString()).to.be.equal(parametersCallbackPromise.toString())
      })
    })
  },

  "testsPromistesIfCallbackVersionReturningPromiseGivesBackTheParametersProvided": function (expect, curryCallbackObject, unlimitedCurry, curryString) {
    it('tests promistes if callback version returning promise gives back the parameters provided; custom return function; async execution of first called detached', async function () {
      parametersImmediateAsReference = curryCallbackObject('parameterA')('parameterB').data
      parametersNoCallbackPromiseReturn = await unlimitedCurry('p')('a',curryString).p().then((d)=>d)
      expect(parametersImmediateAsReference.toString()).to.be.equal(parametersNoCallbackPromiseReturn.toString())
    })
  },

  "testsPromistesIfCallbackVersionReturningPromiseGivesBackTheParametersProvidedTwo": function (expect, unlimitedCurry, abcTester) {
    it('tests if callback version returning promise gives back the parameters provided two;' +
      ' custom return function', async function () {
      const fn = unlimitedCurry(
        (e, parameters) => parameters
      )
      const returnValue = await fn('a')('b')('c').p().then(dataReceived=>dataReceived)
      abcTester(returnValue)
      expect(returnValue.data.returnArray.join('')).to.be.equal('abc')
    })
  },

  "testingReturnedProcessedDataPromise": function (expect, unlimitedCurry) {
    it('testing returned processed data promise', async function () {
      const fn = unlimitedCurry(
        (e, parameters) => parameters.data.returnArray.join('')
      )
      const returnValue = await fn('a')('b')('c').p().then(data=>data)
      expect(returnValue).to.be.equal('abc')
    })
  },

  "callingSameCalls": function (expect, unlimitedCurry) {
    it('calling same calls', async function () {
      const fn = unlimitedCurry(
        (e, parameters) => parameters.data.returnArray.join('')
      )
      fn('1')('2')(3)
      fn('4', 5)('6')('7')('8')
      let ret = await fn('9').p().then(d=>d)

      expect(ret).to.be.equal('123456789')
    })
  }

}