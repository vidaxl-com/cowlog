module.exports = (curryCallbackObject, expect, enviromentSupportsPromises, dslFramework, assert) => {
  describe('Testing the command-sequence tag of the return object', function () {
    const example = dslFramework((e, d) => {
      return d
    })

    data = example.a.b('c').d('e','f').g('h','i').g('j','k')()

    it('iterating-over', function () {
      let testEntries = [
        {command:'a', arguments:[]},
        {command:'b', arguments:['c']},
        {command:'d', arguments:['e', 'f']},
        {command:'g', arguments:['h', 'i']},
        {command:'g', arguments:['j', 'k']}
      ]
      let testEntriesIndex = 0
      for (const val of data.commandSequence()) {
        assert.deepEqual(testEntries[testEntriesIndex], val)
        testEntriesIndex++
      }
    })
  })
}
