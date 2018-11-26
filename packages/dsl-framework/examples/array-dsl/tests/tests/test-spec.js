/* eslint-env mocha */
// require('cowlog')()
const expect = require('chai').expect
const arrayDsl = require('../../src/index')
const assert = require('assert')

describe('Basic Test Suite', function () {
  const notFlatTestArray = [1,2,3,3,4,[5,[3]]]
  const flatTestArray = [1,2,3,3,4,5,3]
  const flatTestArrayMixed = [3,3,4,5,3,1,2]

  it('checks if the return value is an array', function () {
    expect(arrayDsl(notFlatTestArray).flatten.unique()).to.be.an('array')
  })
  it('checks if the "flatten" works', function () {
    assert.deepEqual(arrayDsl(notFlatTestArray).flatten(), [1,2,3,3,4,5,3])
  })
  it('checks if the "unique" works', function () {
    assert.deepEqual(arrayDsl(flatTestArray).unique(), [1,2,3,4,5])
  })
  it('checks if the "unique" and "flatten" works', function () {
    assert.deepEqual(arrayDsl(notFlatTestArray).flatten.unique(), [1,2,3,4,5])
  })
  it('checks "first" ', function () {
    expect(arrayDsl(notFlatTestArray).flatten.unique.first()).to.equal(1)
  })
  it('checks "last" ', function () {
    expect(arrayDsl(notFlatTestArray).flatten.unique.last()).to.equal(5)
  })
  it('checks "sort" ', function () {
    assert.deepEqual(arrayDsl(flatTestArrayMixed).unique.sort(), [1,2,3,4,5])
    assert.deepEqual(arrayDsl(flatTestArrayMixed).sort.unique(), [1,2,3,4,5])
  })
  it('checks "sort" and "unique"', function () {
    assert.deepEqual(arrayDsl(flatTestArrayMixed).unique.sort(), [1,2,3,4,5])
    assert.deepEqual(arrayDsl(flatTestArrayMixed).sort.unique(), [1,2,3,4,5])
  })
  it('checks "reverse"', function () {
    assert.deepEqual(arrayDsl(flatTestArrayMixed).sort.unique.reverse(), [5,4,3,2,1])
    assert.deepEqual(arrayDsl(flatTestArrayMixed).reverse(), [2,1,3,5,4,3,3])
  })
  it('checks "xor" with no arguments', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).xor(), [1,2,3,4,5])
  })
  it('checks "xor" with arguments', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).xor([1,6])(), [2,3,4,5,6])
  })
  it('checks "xor" with the same data', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).xor([1,6]).xor([1,6]).sort(), [1,2,3,4,5])
  })
  it('checks "slice" with one parameter', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).xor([1,6]).xor([1,6]).sort.slice(1)(), [2,3,4,5])
  })
  it('checks "slice" with two parameter', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).xor([1,6]).xor([1,6]).sort.slice(1,3)(), [2,3])
  })
  it('checks "randomItem" ', function () {
    const item = arrayDsl([1,2]).randomItem()
    if(!(item === 1 || item === 2)){
      throw `something bad happened ${item}`
    }
  })
  it('checks "uniqueRandomArray" ', function () {
    const items = arrayDsl([1,2]).uniqueRandomArray()
    for(let i = 0; i <= 3; i++){
      let item = items()
      if(!(item === 1 || item === 2)){
        throw `something bad happened ${item}`
      }
    }
  })
  it('checks "union"', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).union([1,6])(), [1,2,3,4,5,6])
  })
  it('checks "union" more parameters', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).union([1,6], [7])(), [1,2,3,4,5,6,7])
  })
  it('arrayFindIndex', function () {
    assert.deepEqual(arrayDsl([1,2,3,4,5]).arrayFindIndex(x=>x===2)(), 1)
  })
  // it('', function () {
  //
  // })
})
