// [require-a-lot] testIncludes begin
const {
  arrayDsl,
  assert, //node module: assert
  chai, //chai@4.2.0 | http://chaijs.com | BDD/TDD assertion library for node.js and the browser. Test framework agno...
}
// [require-a-lot] testIncludes end
  =
  require('../../requires')
const {expect} = chai

describe('arrify tests',()=>{
  it('checks "arrify" with no arguments', function () {
    assert.deepEqual(arrayDsl().arrify(), [])
  })

  it('checks "arrify" with various arguments', function () {
    assert.deepEqual(arrayDsl('first').arrify(), ['first'])
    assert.deepEqual(arrayDsl(1).arrify(), [1])
    assert.deepEqual(arrayDsl(null).arrify(), [])
    assert.deepEqual(arrayDsl(undefined).arrify(), [])
    assert.deepEqual(arrayDsl({}).arrify(), [{}])

  })
  it('checks "arrify" with last', function () {
    assert.deepEqual(arrayDsl([2,1]).arrify.last(), [1])
    // l(11,arrayDsl([1,2]).last.arrify())()
    // l('here', arrayDsl([1,2]).arrify.last())()
    // assert.deepEqual(arrayDsl([1,2]).arrify(), [1,2])
  })

})
