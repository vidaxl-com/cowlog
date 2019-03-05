/* eslint-env mocha */
require('cowlog')()
const {expect} = require('chai')
const partenting = require('../../src')
const flatten = require('flat')
const assert = require('assert')
const _ = require('lodash')

describe('Basic Test Suite', function () {
  const exampleObject = {
    a:{
      b:{
        c:1,
        c1:2,
        c3:{
          deep:{
            deeper:{
              whatCouldGoWrong: 1
            }
          },
          nameItGood:{
            good: 'good'
          }
        },
        c4:4
      },
      d:{
        e:2
      }
    },
    f: 'g',
    array:[
      {a:{b:'c'}}
    ]
  }
  const getExample = () => _.cloneDeep(exampleObject)

  it('checking default results', function () {
    const parented = partenting(getExample())()
    expect(parented.a.b.c3.parent()).to.deep.equal(parented.a.b)
    expect(parented.a.parent()).to.deep.equal(parented)
    expect(parented.a.children()[0].parent()).to.deep.equal(parented)
  })

  it('.parentName and .childrenName', function () {
    const parented = partenting(getExample()).parentName('p').childrenName('c')()
    expect(parented.a.b.c3.p()).to.deep.equal(parented.a.b)
    expect(parented.a.p()).to.deep.equal(parented)
    expect(parented.a.c()[0].p()).to.deep.equal(parented)
  })

  it('.noChildren', function () {
    const hasParentTags = !Object.keys(flatten(
      partenting(getExample()).noChildren()
    )).filter(path=>path.endsWith('.children')).length
    assert(hasParentTags)
  })

  it('.noParent', function () {
    const hasParentTags = !Object.keys(flatten(
      partenting(getExample()).noParent()
    )).filter(path=>path.endsWith('.parent')).length
    assert(hasParentTags)
  })

  it('.noParent .noChildren', function () {
    const other = partenting(getExample()).noParent.noChildren()
    expect(other).to.deep.equal(exampleObject)
  })

  it('.exclude', function () {
    const other = partenting(getExample()).excludePathIncludes('.c3.')()
    // l(other)()
    // expect(other).to.deep.equal(exampleObject)
  })

  //no praetn no children

})
