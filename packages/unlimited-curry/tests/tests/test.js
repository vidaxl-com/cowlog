/* eslint-env mocha */
const assert = require('chai').assert
const expect = require('chai').expect
require('chai').should()
const ucurry = require('../../src/index')

describe('sync tests', function () {

  const a = ucurry()
  const b = a(1, 2, 3, 4, 5)('a', 'b', 'c')()

  it('basic test without callback', function () {
    expect(ucurry).to.be.an('function')
    expect(b).to.be.an('object').that.have.all.keys('data', 'getFrom')
  })

  it('tests a', function () {
    expect(a(() => {})).to.be.a('function')
  })

  describe('sync return tests', function () {
    this.timeout(150000)

    it('tests the output of a', function () {
      expect(a(() => {})).to.be.a('function')
    })
    it('tests the immediate datatag of an uncalled callbacked one', function () {
      let data = a(() => {})('a')('b').data
      expect(data).to.be.an('object').that.have.all.keys('data', 'getFrom')
    })

    it('tests promise magic', async function () {
      data1 = a(() => {})('a')('b').data
      data2 = await ucurry('p')('a','b')().then((d)=>d)
      data3 = await ucurry(()=>{})('a','b')().then((d)=>d)
      expect(data1.toString()).to.be.equal(data2.toString())
      expect(data1.toString()).to.be.equal(data3.toString())
    })

    it('tests promise magic2', async function () {
      data1 = a(() => {})('a')('b').data
      data2 = await ucurry('p')('a','b').p.then((d)=>d)
      expect(data1.toString()).to.be.equal(data2.toString())
    })

    it('tests the b', function () {
      expect(b.data.returnArray[0]).to.be.equal(1)
      expect(b.data.returnArray[1]).to.be.equal(2)
      expect(b.data.returnArray[2]).to.be.equal(3)
      expect(b.data.returnArray[3]).to.be.equal(4)
      expect(b.data.returnArray[4]).to.be.equal(5)
      expect(b.data.returnArray[5]).to.be.equal('a')
      expect(b.data.returnArray[6]).to.be.equal('b')
      expect(b.data.returnArray[7]).to.be.equal('c')
      expect(b.data.returnArrayChunks[0][0]).to.be.equal(1)
      expect(b.data.returnArrayChunks[0][1]).to.be.equal(2)
      expect(b.data.returnArrayChunks[0][2]).to.be.equal(3)
      expect(b.data.returnArrayChunks[0][3]).to.be.equal(4)
      expect(b.data.returnArrayChunks[0][4]).to.be.equal(5)
      expect(b.data.returnArrayChunks[1][0]).to.be.equal('a')
      expect(b.data.returnArrayChunks[1][1]).to.be.equal('b')
      expect(b.data.returnArrayChunks[1][2]).to.be.equal('c')
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
