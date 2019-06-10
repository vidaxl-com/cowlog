// [require-a-lot] testRequires begin
const {
  assert, // *node module*: assert | https://nodejs.org/api/assert.html |
  requireALot // *alias* of ../../src | The main library itself. |
}
// [require-a-lot] testRequires end
  = require('../../../lib/requires')

describe('container tests', () => {
  it('tests .create .compose .define combo', () => {
    const template = requireALot(require)('assert', 'chai')
      .from('chai', ['expect'])
      .define('one', 1)
      // .define('composedStuff',2)
      .compose('composedStuff', (assert, expect, one) => ({a: assert, e: expect, one}), ['assert', 'expect', 'one'])
      .create('castLogicalFalse', (assert, one, composedStuff) => {
        const randomValue = Math.floor(Math.random() * Math.floor(100))
        return (someBoolean) => {
          try {
            assert(someBoolean)
            // l({randomValue,one,composedStuff}).die()
            return {randomValue, someBoolean, one, composedStuff}
          } catch (e) {
            return false
          }
        }
      }, ['assert', 'one', 'composedStuff'])
      ()
    assert(template.castLogicalFalse(true).one === 1)
    assert(template.castLogicalFalse(true).composedStuff.one === 1)
    const checkIfNotZero = (
      (template.castLogicalFalse(true).randomValue - template.castLogicalFalse(true).randomValue) +
      (template.castLogicalFalse(true).randomValue - template.castLogicalFalse(true).randomValue) +
      (template.castLogicalFalse(true).randomValue - template.castLogicalFalse(true).randomValue) +
      (template.castLogicalFalse(true).randomValue - template.castLogicalFalse(true).randomValue))
    assert(
      checkIfNotZero !== 0
    )
  })

  it('container existence test', () => {
    assert(requireALot.container.container.define('a', 'AAA')().a === 'AAA')
  })

  describe('container hidden variables', () => {
    const basicInstance = () => requireALot.container.container
      .define('a', 'AAA')
      .compose('b', (a) => a)
      .create('c', (b, a) => ({ b, a }))()
    it('_define', () => {
      const ff = basicInstance()
      assert(ff['_define'].a)
      assert(ff['_define'].a.kind === 'parameter')
    })
    it('_compose', () => {
      const ff = basicInstance()
      assert(ff['_compose'].b)
      assert(ff['_compose'].b.kind === 'service')
    })
    it('_create', () => {
      const ff = basicInstance()
      assert(ff['_create'].c)
      assert(ff['_create'].c.kind === 'factory')
    })
    it('_allKeys', () => {
      const ff = basicInstance()
      assert(Array.isArray(ff['_allKeys']))
      assert(ff['_allKeys'].length > 0)
      assert.deepEqual(ff['_allKeys'], ['a', 'b', 'c'])
    })
    describe('_duplicateKeys', () => {
      it('no duplicates', () => {
        const ff = basicInstance()
        assert(Array.isArray(ff['_duplicateKeys']))
        assert(ff['_duplicateKeys'].length === 0)
      })
      it('duplicates', () => {
        const ff = basicInstance()
        const duplicateContentInThisContainer = requireALot.container.container
          .define('a', 'AAA')
          .compose('b', (a) => a)
          .create('c', (b, a) => ({b, a}))
          .create('a', (b) => ({b}))()

        assert(Array.isArray(duplicateContentInThisContainer['_duplicateKeys']))
        assert(duplicateContentInThisContainer['_duplicateKeys'].length === 1)
        assert(duplicateContentInThisContainer['_duplicateKeys'].length === 1)
      })
    })
    describe('_unused', () =>{
      it('case1', () => {
        const ff = basicInstance()
        assert(Array.isArray(ff['_unused']))
        assert(ff['_unused'].length > 0)
        assert.deepEqual(ff['_unused'], ['a', 'b', 'c'])
        // l('a').die()
        ff['c']
        assert.deepEqual(ff['_unused'], ['a', 'b'])
        ff['c']
        assert.deepEqual(ff['_unused'], ['a', 'b'])
        ff['b']
        assert.deepEqual(ff['_unused'], ['a'])
        ff['a']
        assert.deepEqual(ff['_unused'], [])
      })
      it('case2', () => {
        const ff = basicInstance()
        assert(Array.isArray(ff['_unused']))
        assert(ff['_unused'].length > 0)
        assert.deepEqual(ff['_unused'], ['a', 'b', 'c'])
        ff['b']
        assert.deepEqual(ff['_unused'], ['a', 'c'])
        ff['a']
        assert.deepEqual(ff['_unused'], ['c'])
        ff['c']
        assert.deepEqual(ff['_unused'], [])
      })
    })
  })
})
