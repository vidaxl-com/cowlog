module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFramework, abcTester) => {
  describe('chaining', function () {
    it('calling chained tag with void function', function () {
      const fn = dslFramework(
        (e, parameters) => {
          return parameters
        }
      )
      expect(fn.foo().data.returnArray().join('')).to.be.equal('foo')
    })

    it('calling chained tag with not empty function',  function () {
      // const fn = dslFramework.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
      const fn = dslFramework(
        (e, parameters) => {
          // l(parameters)()
          return parameters
        })
      expect(fn.foo(1)().data.returnArray().join('')).to.be.equal('foo1')
    })

    it('calling multiple chained tag with empty function', function () {
      // const fn = dslFramework.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
      const fn = dslFramework(
        (e, parameters) => {
          // l(parameters)()
          return parameters
        }
      )
      expect(fn.foo.bar().data.returnArray().join('')).to.be.equal('foobar')
    })

    it('calling multiple chained tag with non empty function', function () {
      // const fn = dslFramework.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
      const fn = dslFramework(
        (e, parameters) => {
          // l(parameters)()
          return parameters
        }
      )
      expect(fn.foo.bar(1)().data.returnArray().join('')).to.be.equal('foobar1')
    })

    it('calling multiple chained tag functioncall after chaining further', function () {
      // const fn = dslFramework.extra.chainCommands('foo', 'bar').chainCommands('mee')('chainCommands', 'meToo')()(
      const fn = dslFramework(
        (e, parameters) => {
          // l(parameters)()
          return parameters
        }
      )
      expect(fn.foo('f').bar('b')().data.returnArray().join('')).to.be.equal('foofbarb')
    })

    it('tests if callback gets the parameters', function (done) {
      dslFramework((e, d) => {
        expect(d.data.returnArray().join('')).to.be.equal('abc')
        abcTester(d)
        done()
      }).a.b.c()
    })

    it('tests if callback gets the parameters', function (done) {
      dslFramework((e, d) => {
        expect(d.data.returnArrayChunks[0][0]).to.be.equal('a')
        expect(d.data.returnArrayChunks[0][1]).to.be.equal('b')
        expect(d.data.returnArrayChunks[0][2]).to.be.equal('c')
        expect(d.data.returnArrayChunks[1][0]).to.be.equal('d')
        expect(d.data.returnArrayChunks[2][0]).to.be.equal('e')
        expect(d.data.returnArrayChunks[2][1]).to.be.equal('f')
        // abcTester(d)
        done()
      }).a('b', 'c').d.e('f')
    })
  })
}
