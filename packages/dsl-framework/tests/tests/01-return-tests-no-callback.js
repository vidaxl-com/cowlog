module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFramework, curryString, curryObject) => {
  describe('return tests no callback', function () {
    it('tests the output of a', function () {
      expect(curryCallbackObject).to.be.a('function')
    })
    it('tests the immediate datatag of an uncalled callbacked one', function () {
      let data = curryCallbackObject('a')(curryString).data
      expect(data).to.be.an('object').that.have.all.keys('data', 'getFrom', 'command', 'arguments', 'commandSequence')
    })

    if(enviromentSupportsPromises)
    {
      const {testsPomiseMagic, testsPromistesIfCallbackVersionReturningPromiseGivesBackTheParametersProvided} =
        require('./promise-tests')
      testsPomiseMagic(expect, curryCallbackObject, dslFramework, curryString)
      testsPromistesIfCallbackVersionReturningPromiseGivesBackTheParametersProvided(expect, curryCallbackObject,
        dslFramework, curryString)
    }

    it('tests the curryObject', function () {
      expect(curryObject.data.returnArray[0]).to.be.equal(1)
      expect(curryObject.data.returnArray[1]).to.be.equal(2)
      expect(curryObject.data.returnArray[2]).to.be.equal(3)
      expect(curryObject.data.returnArray[3]).to.be.equal(4)
      expect(curryObject.data.returnArray[4]).to.be.equal(5)
      expect(curryObject.data.returnArray[5]).to.be.equal('a')
      expect(curryObject.data.returnArray[6]).to.be.equal(curryString)
      expect(curryObject.data.returnArray[7]).to.be.equal('c')
      expect(curryObject.data.returnArrayChunks[0][0]).to.be.equal(1)
      expect(curryObject.data.returnArrayChunks[0][1]).to.be.equal(2)
      expect(curryObject.data.returnArrayChunks[0][2]).to.be.equal(3)
      expect(curryObject.data.returnArrayChunks[0][3]).to.be.equal(4)
      expect(curryObject.data.returnArrayChunks[0][4]).to.be.equal(5)
      expect(curryObject.data.returnArrayChunks[1][0]).to.be.equal('a')
      expect(curryObject.data.returnArrayChunks[1][1]).to.be.equal(curryString)
      expect(curryObject.data.returnArrayChunks[1][2]).to.be.equal('c')
    })

    it('tests the curryObject', function () {
      expect(curryObject.command.has(1)).to.be.equal(true)
      expect(curryObject.command.has(2)).to.be.equal(false)
      expect(curryObject.command.get(1).toString()).to.be.equal([[1,2,3,4,5]].toString())
      expect(curryObject.command.getArguments(1).toString()).to.be.equal([[2,3,4,5]].toString())
      // getCommandArguments
    })
  })
}
