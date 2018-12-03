/* eslint-env mocha */
// require('cowlog')()
const expect = require('chai').expect
const dslFramework = require('../../src/index')()
const enviromentSupportsPromises =  require('semver').satisfies(process.version, '>6.x')
const assert = require('assert')

const abcTester = function(abcData){
  expect(abcData.data.returnArray.join('')).to.be.equal('abc')
}

describe('Basic Test Suite', function () {
  const curryString = 'Hey'
  const uCurryBuilder = dslFramework()
  const curryObject = uCurryBuilder(1, 2, 3, 4, 5)('a', curryString, 'c')()
  const curryCallbackObject = uCurryBuilder(() => {})

  it('basic test without callback', function () {
    expect(dslFramework).to.be.an('function')
    expect(curryObject).to.be.an('object').that.have.all.keys('data', 'getFrom', 'command', 'arguments', 'commandSequence')
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

  describe('return data constistency tests', function () {
    it('calling the same function multiple times',  function () {
      const fn = dslFramework(
        (e, parameters) => {
          return parameters
        }
      )
      fn('a')('b')('c')()
      expect(fn('d')('e')('f')().data.returnArray.join('')).to.be.equal('def')
    })

    if(enviromentSupportsPromises) {
      const {callingSameCalls} =
        require('./promise-tests')
      callingSameCalls(expect, dslFramework)
    }

    it('calling detached call', function (done) {
      const fn = dslFramework(
        (e, parameters) => {
          done()
        }
      )
      fn('1')('2')(3)
      fn('4', 5)('6')('7')('8')
      fn('9')
    })
  })
  describe('More Dsl related functionalities.', function () {
    describe('chaining', function () {
      it('calling chained tag with void function', function () {
        // const fn = dslFramework.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
        const fn = dslFramework(
          (e, parameters) => {
            // l(parameters)()
            return parameters
          }
        )
        // l(fn.foo())('die')()
        expect(fn.foo().data.returnArray.join('')).to.be.equal('foo')
      })

      it('calling chained tag with not empty function',  function () {
        // const fn = dslFramework.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
        const fn = dslFramework(
          (e, parameters) => {
            // l(parameters)()
            return parameters
          })
        expect(fn.foo(1)().data.returnArray.join('')).to.be.equal('foo1')
      })

      it('calling multiple chained tag with empty function', function () {
        // const fn = dslFramework.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
        const fn = dslFramework(
          (e, parameters) => {
            // l(parameters)()
            return parameters
          }
        )
        expect(fn.foo.bar().data.returnArray.join('')).to.be.equal('foobar')
      })

      it('calling multiple chained tag with non empty function', function () {
        // const fn = dslFramework.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
        const fn = dslFramework(
          (e, parameters) => {
            // l(parameters)()
            return parameters
          }
        )
        expect(fn.foo.bar(1)().data.returnArray.join('')).to.be.equal('foobar1')
      })

      it('calling multiple chained tag functioncall after chaining further', function () {
        // const fn = dslFramework.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
        const fn = dslFramework(
          (e, parameters) => {
            // l(parameters)()
            return parameters
          }
        )
        expect(fn.foo('f').bar('b')().data.returnArray.join('')).to.be.equal('foofbarb')
      })

      it('tests if callback gets the parameters', function (done) {
        dslFramework((e, d) => {
          expect(d.data.returnArray.join('')).to.be.equal('abc')
          abcTester(d)
          done()
        }).a.b.c()
      })

      it('tests if callback gets the parameters', function (done) {
        dslFramework((e, d) => {
          expect(d.data.returnArrayChunks[0][0]).to.be.equal('a')
          expect(d.data.returnArrayChunks[0][1]).to.be.equal('b')
          expect(d.data.returnArrayChunks[0][2]).to.be.equal('c')
          expect(d.data.returnArrayChunks[1][0]).to.be.equal('d')
          expect(d.data.returnArrayChunks[2][0]).to.be.equal('e')
          expect(d.data.returnArrayChunks[2][1]).to.be.equal('f')
          // abcTester(d)
          done()
        }).a('b', 'c').d.e('f')
      })
    })

    describe('Testing the argumnets tag of the return object', function () {
      const example = dslFramework((e, d) => {
        return d
      })

      data = example.a.b('c').d('e','f').g('h','i').g('j','k')()

      it('casting parameter to booleand data', function () {
        expect(data.arguments('a', 'boolean')).to.be.equal(true)
        expect(data.arguments('c', 'boolean')).to.be.equal(false)
      })

      it('Getting the first argument of a once defined command.', function () {
        expect(data.arguments('a', 'firstArgument')).to.be.equal(undefined)
        expect(data.arguments('b', 'firstArgument')).to.be.equal('c')
        expect(data.arguments('d', 'firstArgument')).to.be.equal('e')
        expect(data.arguments('g', 'firstArgument')).to.be.equal('h')
      })

      it('Getting the arguments of the first command.', function () {
        expect(data.arguments('d', 'firstEntry')).to.include('e').and.to.include('f');
      })

      it('Getting the arguments for a once called command.', function () {
        const allEntriesTestDataOnceDefined = data.arguments('d', 'allEntries')
        expect(allEntriesTestDataOnceDefined).to.be.an('array').that.includes.an('array')
        expect(allEntriesTestDataOnceDefined[0]).to.include('e').and.to.include('f');
      })

      it('Getting the arguments for a more called command.', function () {
        const allEntriesTestDataMoreDefined = data.arguments('g', 'allEntries')
        expect(allEntriesTestDataMoreDefined).to.be.an('array').that.includes.an('array')
        expect(allEntriesTestDataMoreDefined[0]).to.include('h').and.to.include('i');
        expect(allEntriesTestDataMoreDefined[1]).to.include('j').and.to.include('k');
      })

      it('different ways of getting patrameters for the return object.', function () {
        expect(data.arguments('a', 'allEntries')[0].length).to.be.equal(0)
      })
    })

    describe('Testing the command-sequence tag of the return object', function () {
      const example = dslFramework((e, d) => {
        return d
      })

      data = example.a.b('c').d('e','f').g('h','i').g('j','k')()

      it('iterating-over', function () {
        let testEntries = [
          {command:'a', arguments:[]},
          {command:'b', arguments:['c']},
          {command:'d', arguments:['e', 'f']},
          {command:'g', arguments:['h', 'i']},
          {command:'g', arguments:['j', 'k']}
        ]
        let testEntriesIndex = 0
        for (const val of data.commandSequence()) {
          assert.deepEqual(testEntries[testEntriesIndex], val)
          testEntriesIndex++
        }
      })
    })

    describe('commandParser Tests', function () {
      const example = dslFramework((e, d) => {
        return d
      })

      data = example.a.b('c').d('e','f').g('h','i').g('j','k')()

      it('testing with real commands', function () {
        expect(data.arguments('g', 'lastEntry')).to.include('j')
        expect(data.arguments('g', 'firstEntry')).to.include('h')
        expect(data.arguments('g', 'firstArgument')).to.equal('h')
        expect(data.arguments('g', 'lastArgument')).to.equal('j')
      })

      it('testing with real commands', function () {
        let commandParser = require('../../src/unlimited-curry-factory/get-command-arguments/commandParser')
        const baseArray = ['a', 'b', 'c']
        expect(commandParser(baseArray, 'lastEntry')).to.include('b').and.to.include('c')
        expect(commandParser([baseArray], 'lastEntry')).to.include('b').and.to.include('c')
      })

    })
  })
})
