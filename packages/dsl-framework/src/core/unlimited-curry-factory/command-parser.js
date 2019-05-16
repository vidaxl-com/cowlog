module.exports = exports = (returnObject) => // new Proxy
  ({
    get: (command) => returnObject.data.returnArrayChunks.filter(argumentArray => { return argumentArray[0] === command }),
    has: (command) => returnObject.data.returnArrayChunks.some(argumentArray => argumentArray[0] === command),
    _getArrayData: (_arguments) => Array.from(_arguments).flat(),
    hasMore: function () {
      const commands = this._getArrayData(arguments)
      return commands.map(command => this.has(command))
    },
    hasAnd: function () {
      const commands = this._getArrayData(arguments)
      return commands ? this.hasMore(commands).reduce((acc = true, currValue) => acc && currValue) : false
    },
    hasOr: function () {
      const commands = this._getArrayData(arguments)
      return commands ? this.hasMore(commands).reduce((acc = true, currValue) => acc || currValue) : false
    },
    hasToObject: function () {
      let returnObject = {}
      this._getArrayData(arguments).forEach(entry => {
        returnObject[entry] = this.has(entry)
      })

      return returnObject
    },
    // todo: duplicate
    getMore: function () {
      const commands = this._getArrayData(arguments)
      return commands.map(command => this.get(command))
    },
    // todo: duplicate
    getToObject: function () {
      let returnObject = {}
      this._getArrayData(arguments).forEach(entry => {
        returnObject[entry] = this.get(entry)
      })

      return returnObject
    },
    getArguments: function (command, commands) {
      return this.get(command, commands).map((command) => command.slice(1))
    }
  // }
  //, {
  // get: function (obj, prop) {
  //   return prop in obj ?
  //     obj[prop] : (() => {
  //       const get = prop.startsWith('get')
  //       //availableCommands
  //       ['get', 'has'].map(command => prop.startsWith(command)).reduce((acc = false, actual) => actual || acc)
  //         ? prop.endsWith('More')
  //         : function () {
  //           const commands = this._getArrayData(arguments)
  //           return commands.map(command => this.get(command))
  //         }
  //
  //     })()
  // }
  })
