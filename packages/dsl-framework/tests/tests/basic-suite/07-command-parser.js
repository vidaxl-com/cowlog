const assert = require('assert')
module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFrameworkDefaultInstance, dslFramework) => {
  describe('commandParser Tests', function () {
    const example = dslFrameworkDefaultInstance((e, d) => {
      return d
    })

    data = example.a.b('c').d('e', 'f').g('h', 'i').g('j', 'k')()

    it('.has', function () {
      assert(data.command.has('g') === true)
      assert(data.command.has('g', 'd') === true)
      assert(data.command.has(['g']) === false)
      assert(data.command.has('buu') === false)
    })

    it('.hasMore', function () {
      assert(data.command.hasMore(['g', 'd', 'aa']))
      assert.deepEqual(data.command.hasMore(['g', 'd', 'aa']), [true, true, false])
      assert.deepEqual(data.command.hasMore('g'), [true])
    })

    it('.hasAnd', function () {
      assert(data.command.hasAnd('g'))
      assert(!data.command.hasAnd('gg'))
      assert(data.command.hasAnd(['g', 'd']))
      assert(data.command.hasAnd(['g'], 'd'))
      assert(data.command.hasAnd(['g'], ['d', 'a', 'b']))
      assert(!data.command.hasAnd(['g', 'd', 'aa']))
      assert(!data.command.hasAnd(['g', 'd'], 'aa'))
      assert(!data.command.hasAnd(['g', 'd'], ['aa']))
    })

    it('.hasOr', function () {
      assert(data.command.hasOr(['g', 'd', 'aa']))
      assert(!data.command.hasOr(['gg', 'dd', 'aa']))
      assert(!data.command.hasOr('gg', ['dd', 'aa']))
    })

    it('.hasToObject', function () {
      assert.deepEqual(data.command.hasToObject('g'), {g: true})
      assert.deepEqual(data.command.hasToObject('g', 'a'), {g: true, a: true})
      assert.deepEqual(data.command.hasToObject(['g', 'a']), {g: true, a: true})
      assert.deepEqual(data.command.hasToObject(['g', 'a', 'foo']), {g: true, a: true, foo: false})
      assert.deepEqual(data.command.hasToObject(['g', 'a'], 'foo'), {g: true, a: true, foo: false})
      assert.deepEqual(data.command.hasToObject(['g', 'a'], ['foo'], 'b'), {g: true, a: true, foo: false, b: true})
      assert.deepEqual(data.command.hasToObject(['g', 'a'], ['foo', 'b']), {g: true, a: true, foo: false, b: true})
    })

    it('.getMore', function () {
      assert.deepEqual(data.command.getMore(['b']), [[['b', 'c']]])
      assert.deepEqual(data.command.getMore(['b'],'d'), [[['b', 'c']],[['d','e','f']]])
      assert.deepEqual(data.command.getMore(['b'],['d','g']), [[['b', 'c']],[['d','e','f']],[['g','h','i'],['g','j','k']]])
      assert.deepEqual(data.command.getMore(['b'],['d','g'],'jj'), [[['b', 'c']],[['d','e','f']],[['g','h','i'],['g','j','k']],[]])
    })

    it('.getToObject', function () {
      assert.deepEqual(data.command.getToObject(['b']), {b:[['b', 'c']]})
      assert.deepEqual(data.command.getToObject(['b'],'jj'), {b:[['b', 'c']],jj:[]})
      const{g}=data.command.getToObject(['b'],'jj','g')
      assert.deepEqual(g, [['g','h','i'],['g','j','k']])
    })

    // it('.', function () {

    // })

  })
}
