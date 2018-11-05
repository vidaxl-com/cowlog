/* eslint-env mocha */
const expect = require('chai').expect
const unlimitedCurry = require('../../src/index')
const abcTester = function(abcData){
  expect(abcData.data.returnArray.join('')).to.be.equal('abc')
}

describe('Basic Test Suite', function () {
  const curryString = 'Hey'
  const uCurryBuilder = unlimitedCurry()
  const curryObject = uCurryBuilder(1, 2, 3, 4, 5)('a', curryString, 'c')()
  const curryCallbackObject = uCurryBuilder(() => {})

  it('basic test without callback', function () {
    expect(unlimitedCurry).to.be.an('function')
    expect(curryObject).to.be.an('object').that.have.all.keys('data', 'getFrom', 'command', 'arguments')
  })

  it('tests a', function () {
    expect(curryCallbackObject).to.be.a('function')
  })

  describe('return tests no callback', function () {
    it('tests the output of a', function () {
      expect(curryCallbackObject).to.be.a('function')
    })
    it('tests the immediate datatag of an uncalled callbacked one', function () {
      let data = curryCallbackObject('a')(curryString).data
      expect(data).to.be.an('object').that.have.all.keys('data', 'getFrom', 'command', 'arguments')
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

    it('tests the curryObject', function () {
        expect(curryObject.command.has(1)).to.be.equal(true)
        expect(curryObject.command.has(2)).to.be.equal(false)
        expect(curryObject.command.get(1).toString()).to.be.equal([[1,2,3,4,5]].toString())
        expect(curryObject.command.getArguments(1).toString()).to.be.equal([[2,3,4,5]].toString())
        // getCommandArguments
    })
  })

  describe('callback tests', function () {
    it('tests if callback version is a function and callback parameter 2 is an object', function () {
      expect(unlimitedCurry()((e, d) => {
      })).to.be.a('function')
    })

    it('tests if callback is called', function (done) {
      const fn = unlimitedCurry((e, d) => {
        done()
      })
      fn('a')()
    })

    it('tests if callback gets the parameters', function (done) {
      unlimitedCurry((e, d) => {
        abcTester(d)
        done()
      })('a')('b')('c')()
    })

    it('tests if callback gets the parameters false', function (done) {
      unlimitedCurry((e, d) => {
        expect(d.data.returnArray[0]).to.be.equal(false)
        done()
      })(false)()
    })

    it('tests if callback carried out (once only) on a detached state (no return value obviously)', function (done) {
      const fn = unlimitedCurry((e, d) => {
        done()
      })
      fn('a')('b')('c')
    })

    it('tests if callback version returning promise gives back ' +
      'the parameters provided; custom return function', async function () {
      const fn = unlimitedCurry(
        (e, parameters) => parameters
      )
      const returnValue = await fn('a')('b')('c').p().then(dataReceived=>dataReceived)
      abcTester(returnValue)
      expect(returnValue.data.returnArray.join('')).to.be.equal('abc')
    })

    it('testing sync returned processed data, promise', async function () {
      const fn = unlimitedCurry(
        (e, parameters) => parameters.data.returnArray.join('')
      )
      const returnValue = await fn('a')('b')('c').p().then(data=>data)
      expect(returnValue).to.be.equal('abc')
    })

    it('testing sync returned processed data', function () {
      const fn = unlimitedCurry(
        (e, parameters) => parameters.data.returnArray.join('')
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

    it('tests if callback version multiple currying', async function (done) {
      const fn = unlimitedCurry(
        (e, parameters) => {
          done()
          return parameters
        }
      )
      fn('a')('b')('c')()
    })
  })

  describe('return data constistency tests', function () {
    it('calling the same function multiple times', async function () {
      const fn = unlimitedCurry(
        (e, parameters) => {
          return parameters
        }
      )
      fn('a')('b')('c')()
      expect(fn('d')('e')('f')().data.returnArray.join('')).to.be.equal('def')
    })

    it('calling same  calls', async function () {
      const fn = unlimitedCurry(
        (e, parameters) => parameters.data.returnArray.join('')
      )
      fn('1')('2')(3)
      fn('4', 5)('6')('7')('8')
      let ret = await fn('9').p().then(d=>d)

      expect(ret).to.be.equal('123456789')
    })

    it('calling detached call', function (done) {
      const fn = unlimitedCurry(
        (e, parameters) => {
          done()
        }
      )
      fn('1')('2')(3)
      fn('4', 5)('6')('7')('8')
      fn('9')
    })
  })

  describe('realDslExperimentalTests', function () {
    describe('chaining', function () {
      it('calling chained tag with void function', async function () {
        // const fn = unlimitedCurry.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
        const fn = unlimitedCurry.extra.chainCommands('foo', 'bar')()(
          (e, parameters) => {
            // l(parameters)()
            return parameters
          }
        )
        // l(fn.foo())('die')()
        expect(fn.foo().data.returnArray.join('')).to.be.equal('foo')
      })

      it('calling chained tag with not empty function', async function () {
        // const fn = unlimitedCurry.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
        const fn = unlimitedCurry.extra.chainCommands('foo', 'bar')()(
          (e, parameters) => {
            // l(parameters)()
            return parameters
          }
        )
        expect(fn.foo(1)().data.returnArray.join('')).to.be.equal('foo1')
      })

      it('calling multiple chained tag with empty function', async function () {
        // const fn = unlimitedCurry.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
        const fn = unlimitedCurry.extra.chainCommands('foo', 'bar')()(
          (e, parameters) => {
            // l(parameters)()
            return parameters
          }
        )
        expect(fn.foo.bar().data.returnArray.join('')).to.be.equal('foobar')
      })

      it('calling multiple chained tag with non empty function', async function () {
        // const fn = unlimitedCurry.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
        const fn = unlimitedCurry.extra.chainCommands('foo', 'bar')()(
          (e, parameters) => {
            // l(parameters)()
            return parameters
          }
        )
        expect(fn.foo.bar(1)().data.returnArray.join('')).to.be.equal('foobar1')
      })

      it('calling multiple chained tag functioncall after chaining further', async function () {
        // const fn = unlimitedCurry.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
        const fn = unlimitedCurry.extra.chainCommands('foo', 'bar')()(
          (e, parameters) => {
            // l(parameters)()
            return parameters
          }
        )
        expect(fn.foo('f').bar('b')().data.returnArray.join('')).to.be.equal('foofbarb')
      })
    })
  })


  // describe('return Arguments tag', function () {
  //   describe('', function () {
  //     it('calling chained tag with void function', async function () {
  //       // const fn = unlimitedCurry.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
  //       const fn = unlimitedCurry.extra()(
  //         (e, parameters) => {
  //           return parameters
  //         }
  //       )
  //       const arguments = fn.foo('a', 'b')().arguments
  //       console.log(Object.keys(arguments),arguments.toString(),
  //         "ZZZ",
  //         arguments.GET_FIRST_ENTRY
  //       )
  //       expect(arguments('foo', arguments.GET_FIRST_ARGUMENT)).to.be.equal('a')
  //     })
  //   })
  // })

})
