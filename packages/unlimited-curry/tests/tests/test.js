/* eslint-env mocha */
const expect = require('chai').expect
require('chai').should()
const unlimitedCurry = require('../../src/index')
let l = console.log
const abcTester = function(abcData){
  expect(abcData.data.returnArray[0]).to.be.equal('a')
  expect(abcData.data.returnArray[1]).to.be.equal('b')
  expect(abcData.data.returnArray[2]).to.be.equal('c')
}

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

  describe('return tests no callback', function () {
    this.timeout(1500)

    it('tests the output of a', function () {
      expect(curryCallbackObject).to.be.a('function')
    })
    it('tests the immediate datatag of an uncalled callbacked one', function () {
      let data = curryCallbackObject('a')(curryString).data
      expect(data).to.be.an('object').that.have.all.keys('data', 'getFrom')
    })

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

    it('tests promistests if callback version returning promise gives back the parameters provided; custom return function; async execution of first calle detached', async function () {
      parametersImmediateAsReference = curryCallbackObject('parameterA')('parameterB').data
      parametersNoCallbackPromiseReturn = await unlimitedCurry('p')('a',curryString).p().then((d)=>d)
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

  describe('callback tests', function () {
    this.timeout(1500)

    it('tests if callback version is a function and callback parameter 2 is an object', function () {
      expect(unlimitedCurry()((e,d) => {
      })).to.be.a('function')
    })

    it('tests if callback is called', function (done) {
      const fn = unlimitedCurry((e,d) => {
        done()
      })
      fn('a')()
    })

    it('tests if callback gets the parameters', function (done) {
      const fn = unlimitedCurry((e,d) => {
        abcTester(d)
        done()
      })
      fn('a')('b')('c')()
    })

    it('tests if callback without closing empty call', function (done) {
      const fn = unlimitedCurry((e,d) => {
          done()
      })
      fn('a')('b')('c')
    })

    it('tests if callback version returning promise gives back some custom value', async function () {
      const fn = unlimitedCurry(
        (e, parameters) => 'Yee'
      )
      const returnValue = await fn('a')('b')('c').p().then(dataReceived=>dataReceived)
      expect(returnValue).to.be.equal('Yee')
    })

    it('tests if callback version returning promise gives back ' +
      'the parameters provided; custom return function', async function () {
      const fn = unlimitedCurry(
        (e, parameters) => parameters
      )
      const returnValue = await fn('a')('b')('c').p().then(dataReceived=>dataReceived)
      expect(returnValue.data.returnArray[0]).to.be.equal('a')
      expect(returnValue.data.returnArray[1]).to.be.equal('b')
      expect(returnValue.data.returnArray[2]).to.be.equal('c')
    })

    it('tests if callback version returning promise gives back ' +
      'the parameters provided; no custom return function', async function () {
      const fn = unlimitedCurry(
        (e, parameters) => parameters.data.returnArray.join('')
      )
      const returnValue = await fn('a')('b')('c').p().then(dataReceived=>dataReceived)
      expect(returnValue).to.be.equal('abc')
    })

    it('tests if callback version returning promise gives back ' +
      'the parameters provided; custom return function; async execution of first callback', async function () {
      const fn = unlimitedCurry(
        (e, parameters) => parameters.data.returnArray.join(''),
        parameters=>parameters.data.returnArray.join('')
      )
      const returnValue = await fn('a')('b')('c').p().then(data=>data)
      expect(returnValue).to.be.equal('abc')
    })

    it('tests if callback version returning promise gives back ' +
      'the parameters provided; custom return function; sync execution of first callback', function () {
      const fn = unlimitedCurry(
        (e, parameters) => parameters.data.returnArray.join('')
      )
      const returnValue = fn('a')('b')('c')()
      expect(returnValue).to.be.equal('abc')
    })

    it('tests if callback version returning promise gives back ' +
      'the parameters provided; custom return function; sync execution of first callback; testing first callback', function (done) {
      const fn = unlimitedCurry(
        (e, parameters) => {
          done()
        },
        parameters=>parameters.data.returnArray[0]
          + parameters.data.returnArray[1]
          + parameters.data.returnArray[2]
      )
      const returnValue = fn('a')('b')('c')()
      expect(returnValue).to.be.equal('abc')
    })

    it('tests if callback split calls', function () {
      const getMyCurry = () => unlimitedCurry(
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

    it('tests if callback version returning promise gives back ' +
      'the parameters provided; custom return function; sync execution of first callback; testing second callback', async function (done) {
      const fn = unlimitedCurry(
        (e, parameters) => {
          done()
          return parameters

        }
      )
      fn('a')('b')('c')()
    })

    it('calling the same function multiple times', async function () {
      const fn = unlimitedCurry(
        (e, parameters) => {
          return parameters
        }
      )

      fn('a')('b')('c')()
      // expect(fn('d')('e')('f')().data.returnArray.join('')).to.be.equal('def')
      // fn('d')('e')('d')()
      //
      // console.log(fn('a')('b')('c')(),fn('d')('e')('d')())
    })

  })

})
