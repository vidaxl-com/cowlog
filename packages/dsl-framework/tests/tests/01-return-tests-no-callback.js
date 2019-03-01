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
      const returnArray = curryObject.data.returnArray()
      const returnArrayChunks = curryObject.data.returnArrayChunks
      expect(returnArray[0]).to.be.equal(1)
      expect(returnArray[1]).to.be.equal(2)
      expect(returnArray[2]).to.be.equal(3)
      expect(returnArray[3]).to.be.equal(4)
      expect(returnArray[4]).to.be.equal(5)
      expect(returnArray[5]).to.be.equal('a')
      expect(returnArray[6]).to.be.equal(curryString)
      expect(returnArray[7]).to.be.equal('c')
      expect(returnArrayChunks[0][0]).to.be.equal(1)
      expect(returnArrayChunks[0][1]).to.be.equal(2)
      expect(returnArrayChunks[0][2]).to.be.equal(3)
      expect(returnArrayChunks[0][3]).to.be.equal(4)
      expect(returnArrayChunks[0][4]).to.be.equal(5)
      expect(returnArrayChunks[1][0]).to.be.equal('a')
      expect(returnArrayChunks[1][1]).to.be.equal(curryString)
      expect(returnArrayChunks[1][2]).to.be.equal('c')
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
