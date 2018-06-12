let clone = require('clone')
let collected = []
module.exports = exports = function (control, cb) {
    return function () {
      let returnFunction = function (command) {
        if(command!=='END'){
          let returnValue = returnFunction
          collected.push(command)
          console.log(collected,control)
          return returnValue
        }
        else{
          let ret = clone(collected)
          collected = []
          cb(0, ret)
        }
      }
      return returnFunction()
    }

}
