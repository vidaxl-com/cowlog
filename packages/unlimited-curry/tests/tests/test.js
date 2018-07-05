/* eslint-env mocha */
const expect = require('chai').expect
require('chai').should()
const unlimitedCurry = require('../../src/index')
require('cowlog')()
let flatten = require('flat')

describe('sync tests', function () {

  const curryString = 'Hey'

  const uCurryBuilder = unlimitedCurry()
  const curryObject = uCurryBuilder(1, 2, 3, 4, 5)('a', curryString, 'c')()
  const curryCallbackObject = uCurryBuilder(() => {})

  it('basic test without callback', function () {
    expect(unlimitedCurry).to.be.an('function')
    expect(curryObject).to.be.an('object').that.have.all.keys('data', 'getFrom')
  })

  it('tests a', function () {
    expect(curryCallbackObject).to.be.a('function')
  })

  describe('sync return tests', function () {
    this.timeout(150000)

    it('tests the output of a', function () {
      expect(curryCallbackObject).to.be.a('function')
    })
    it('tests the immediate datatag of an uncalled callbacked one', function () {
      let data = curryCallbackObject('a')(curryString).data
      expect(data).to.be.an('object').that.have.all.keys('data', 'getFrom')
    })

    it('tests promise magic', async function () {
      parametersImmediateAsReference = curryCallbackObject('a')(curryString).data
      parametersNoCallbackPromiseReturn = await unlimitedCurry('p')('a', curryString)().then((d)=>d)
      parametersCallbackPromise = await unlimitedCurry(()=>{})('a', curryString)().then((d)=>d)
      expect(parametersImmediateAsReference.toString()).to.be.equal(parametersNoCallbackPromiseReturn.toString())
      expect(parametersImmediateAsReference.toString()).to.be.equal(parametersCallbackPromise.toString())
    })


    it('tests promise detached', async function () {
      parametersImmediateAsReference = curryCallbackObject('parameterA')('parameterB').data
      l(parametersImmediateAsReference)
      parametersNoCallbackPromiseReturn = await unlimitedCurry('p')('a',curryString).p.then((d)=>d)
      expect(parametersImmediateAsReference.toString()).to.be.equal(parametersNoCallbackPromiseReturn.toString())
    })

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
  })

  describe('sync callback tests', function () {
    this.timeout(150000)

    it('tests if callback version is a function', function () {
      expect(uCurryBuilder(() => {})).to.be.a('function')
    })

    it('tests if callback version return statement is differentnow', async function () {
      let testedFunction = uCurryBuilder(() => {
        testedFunction.p.then((data)=>{
          return "YEY"
        })
        //do some calculation with the data, I just wil flat it
      })
      expect(testedFunction).to.be.a('function')
      // l(testedFunction('a')('b').data)
      const returnValue = await testedFunction('a')('b').p.then(d=>d)
      expect(returnValue.data.returnArray[0]).to.be.equal('a')

      l(returnValue)
    })

  })

})
