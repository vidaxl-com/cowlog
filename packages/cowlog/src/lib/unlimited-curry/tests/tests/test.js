/* eslint-env mocha */
const assert = require('chai').assert
const expect = require('chai').expect
require('chai').should()

describe('cowlog functional tests', function () {
  this.timeout(150000)

  it('basic data testing', function () {
    expect("AAA AA A").to.be.a('string').that.does.include('AAA A')
  })
})
