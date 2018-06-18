/* eslint-env mocha */
const assert = require('chai').assert
const expect = require('chai').expect
require('chai').should()
const {sync} = require('../../src/index')
require('cowlog')()

describe('sync tests', function () {

  const a = sync()
  const b = a(1, 2, 3, 4, 5)('a', 'b', 'c')()

  it('basic test without callback', function () {
    let all = require('../../src/index')
    expect(all).to.be.an('object')
      .that.have.all.keys(['sync', 'detached'])
    expect(b).to.be.an('object').that.have.all.keys('data', 'getFrom')
  })

  it('tests a', function () {
    expect(a(() => {})).to.be.a('function')
  })
  describe('sync return tests', function () {
    this.timeout(150000)

    it('tests the output of a', function () {
      l(b)
      expect(a(() => {})).to.be.a('function')
    })
  })
  describe('sync callback tests', function () {
    this.timeout(150000)

    it('tests a', function () {
      expect(a(() => {})).to.be.a('function')
    })
    it('tests the output of a', function () {
      expect(a(() => {})).to.be.a('function')
    })
    it('tests the output of calling a with an empty function call', function () {
      expect(a(() => {})()).to.be.an('object')
    })
  })
})
