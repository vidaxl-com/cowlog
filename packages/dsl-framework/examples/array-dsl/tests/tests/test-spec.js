/* eslint-env mocha */
require('cowlog')()
// [require-a-lot] testIncludes begin
const {
  arrayDsl,
  assert, // node module: assert
  expect, // *tag* of chai | chai@4.2.0 | http://chaijs.com | BDD/TDD assertion library for node.js and the browser. ...
  requireDir, // require-dir@1.2.0 | https://github.com/aseemk/requireDir | Helper to require() directories.
  path, // node module: path
}
// [require-a-lot] testIncludes end
  =
require('../requires')

describe('Basic Test Suite', function () {
  const notFlatTestArray = [1,2,3,3,4,[5,[3]]]
  const flatTestArray = [1,2,3,3,4,5,3]
  const flatTestArrayMixed = [3,3,4,5,3,1,2]

  const testData = {
    notFlatTestArray:notFlatTestArray.slice(0),
    flatTestArray:flatTestArray.slice(0),
    flatTestArrayMixed:flatTestArrayMixed.slice(0)
  }

  it('if it gets a non array value by default it returns the same value', function () {
    expect(arrayDsl(1).flatten.unique()).to.equal(1)
  })
  it('checks if the return value is an array', function () {
    expect(arrayDsl(testData.notFlatTestArray).flatten.unique()).to.be.an('array')
  })
  it('checks if the "flatten" works', function () {
    assert.deepEqual(arrayDsl(testData.notFlatTestArray).flatten(), [1,2,3,3,4,5,3])
  })
  it('checks if the "unique" works', function () {
    assert.deepEqual(arrayDsl(testData.flatTestArray).unique(), [1,2,3,4,5])
  })
  it('checks if the "unique" and "flatten" works', function () {
    assert.deepEqual(arrayDsl(testData.notFlatTestArray).flatten.unique(), [1,2,3,4,5])
  })
  it('checks "first" ', function () {
    expect(arrayDsl(testData.notFlatTestArray).flatten.unique.first()).to.equal(1)
  })
  it('checks "head" ', function () {
    expect(arrayDsl(testData.notFlatTestArray).flatten.unique.head()).to.equal(1)
  })
  it('checks "tail" ', function () {
    expect(arrayDsl(testData.notFlatTestArray).flatten.unique.tail()).to.deep.equal([2,3,4,5])
  })
  it('checks "last" ', function () {
    expect(arrayDsl(testData.notFlatTestArray).flatten.unique.last()).to.equal(5)
  })
  it('checks "sort" ', function () {
    assert.deepEqual(arrayDsl(testData.flatTestArrayMixed).unique.sort(), [1,2,3,4,5])
    assert.deepEqual(arrayDsl(testData.flatTestArrayMixed).sort.unique(), [1,2,3,4,5])
  })
  it('checks "sort" and "unique"', function () {
    assert.deepEqual(arrayDsl(testData.flatTestArrayMixed).unique.sort(), [1,2,3,4,5])
    assert.deepEqual(arrayDsl(testData.flatTestArrayMixed).sort.unique(), [1,2,3,4,5])
  })
  it('checks "reverse"', function () {
    assert.deepEqual(arrayDsl(testData.flatTestArrayMixed).sort.unique.reverse(), [5,4,3,2,1])
    assert.deepEqual(arrayDsl(testData.flatTestArrayMixed).reverse(), [2,1,3,5,4,3,3])
  })



  it('tests originalData', function () {
    expect(notFlatTestArray).to.deep.equal(testData.notFlatTestArray)
    expect(flatTestArray).to.deep.equal(testData.flatTestArray)
    expect(flatTestArrayMixed).to.deep.equal(testData.flatTestArrayMixed)
  })

  // it('', function () {
  //
  // })
  // it('', function () {
  //
  // })
  // it('', function () {
  //
  // })
  // it('', function () {
  //
  // })

})

requireDir(path.join(__dirname, 'chain-functions'))
