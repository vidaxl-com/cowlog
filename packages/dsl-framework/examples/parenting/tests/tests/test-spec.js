/* eslint-env mocha */
require('cowlog')()
const {expect} = require('chai')
const partenting = require('../../src')

describe('Basic Test Suite', function () {
  exampleObject = {
    a:{
      b:{
        c:1,
        c1:2,
        c3:{
          deep:{
            deeper:{
              whatCouldGoWrong: 1
            }
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

  it('checking default results', function () {
    const parented = partenting(exampleObject)()
    expect(parented.a.b.c3.parent()).to.deep.equal(parented.a.b)
    expect(parented.a.parent()).to.deep.equal(parented)
    expect(parented.a.children()[0].parent()).to.deep.equal(parented)
  })

})
