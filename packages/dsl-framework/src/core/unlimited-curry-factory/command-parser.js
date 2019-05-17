const getArrayData = require('./lib/get-array-data')
module.exports = exports = (returnObject) => {
  const baseObject = {
    init: () => {
      const baseKind = (kind) => function () {
        let command = arguments[0]
        if (Array.isArray(command) || arguments.length > 1) {
          // command = getArrayData(arguments)
          return baseObject[`${kind === 'some' ? 'has' : 'get'}`]['more'](command)
        }
        return returnObject.data.returnArrayChunks[kind](argumentArray => argumentArray[0] === command)
      }

      baseObject.has = baseKind('some')
      baseObject.get = baseKind('filter')

      const moreKind = (kind) => function () {
        const commands = getArrayData(arguments)
        return commands.map(command => baseObject[kind](command))
      }
      baseObject.has.more = moreKind('has')
      baseObject.get.more = moreKind('get')
      baseObject.hasMore = baseObject.has.more
      baseObject.getMore = baseObject.get.more

      const hasLogicalKind = (kind) => function () {
        const commands = getArrayData(arguments)
        return commands ? baseObject.has.more(commands).reduce(kind) : false
      }

      baseObject.has.and = hasLogicalKind((acc = true, currValue) => acc && currValue)
      baseObject.has.or = hasLogicalKind((acc = true, currValue) => acc || currValue)

      baseObject.hasAnd = baseObject.has.and
      baseObject.hasOr = baseObject.has.or

      baseObject.has.xor = function () {
        const commands = getArrayData(arguments)

        return commands
          ? baseObject.has.more(commands).filter((entry) => entry).length &&
          baseObject.has.more(commands).filter((entry) => !entry).length
          : false
      }
      baseObject.hasXor = baseObject.has.xor

      const toObjectKind = (kind) => function () {
        let returnObject = {}
        getArrayData(arguments).forEach(entry => {
          returnObject[entry] = baseObject[kind](entry)
        })

        return returnObject
      }

      baseObject.has.object = toObjectKind('has')
      baseObject.get.object = toObjectKind('get')

      baseObject.hasObject = baseObject.has.object
      baseObject.getObject = baseObject.get.object

      return baseObject
    },

    getArguments: function (command, commands) {
      if(typeof commands === 'undefined' )
      {
        commands = returnObject.data.returnArrayChunks
      }
      return this.get(command).map((command) => command.slice(1))
    }
  }

  return baseObject.init()
}
