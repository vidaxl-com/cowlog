/* eslint-env mocha */
// require('cowlog')()
const expect = require('chai').expect

const {dslFrameworkDefaultInstance, dslFramework} = require('../library/dsl-framework-factory')
const enviromentSupportsPromises =  require('semver').satisfies(process.version, '>6.x')

// const abcTester = function(abcData){
//   expect(abcData.data.returnArray().join('')).to.be.equal('abc')
// }

describe('Basic Test Suite', function () {
  const { curryString, uCurryBuilder, curryObject, curryCallbackObject } = require('../library/curry-factory')

  it('basic test without callback', function () {
    expect(dslFrameworkDefaultInstance).to.be.an('function')
    expect(curryObject).to.be.an('object').that.have.all.keys('data', 'getFrom', 'command', 'arguments', 'commandSequence')
  })

  it('tests a', function () {
    expect(curryCallbackObject).to.be.a('function')
  })

  require('./basic-suite/01-return-tests-no-callback')(curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance)
  require('./basic-suite/02-callback-tests')(curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance)
  require('./basic-suite/03-return-data-consistency')(curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance)

  describe('More Dsl related functionalities.', function () {
    require('./basic-suite/04-DSL-chaining')(curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance)
    require('./basic-suite/05-')(curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance)
    require('./basic-suite/06-command-sequence')(curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance)
    require('./basic-suite/07-command-parser')(curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance)
    require('./basic-suite/08-arguments-parser')(curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance)
  })

  require('./basic-suite/09-dsl-framework-parameters')(curryCallbackObject, expect)
  require('./basic-suite/10-DSL-of-the-framework-initialization')(curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance)
  require('./basic-suite/11-repeate-me')(curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance)
  require('./basic-suite/12-factory')(curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance, dslFramework)
})
