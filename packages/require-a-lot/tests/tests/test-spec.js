/* eslint-env mocha */
require('cowlog')()
const {expect} = require('chai')
const requireALot = require('../../src')

describe('Basic Test Suite', function () {

  it('usecase', function () {
    require('license-checker')
    const {camelcase, chai, babelCli, testSpec} = requireALot(require)('camelcase', 'chai', 'license-checker', './test-spec.js')
    const checkObject = {camelcase, chai, babelCli, testSpec}
    Object.keys(checkObject).map(value=>!!value).forEach(value=>expect(value).to.equal(true))
  })

})
