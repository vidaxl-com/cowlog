const isObject = require('isobject')

module.exports = (data, origArguments) => {
  if(data.command.has('keys')){
    return origArguments.map((argumentField)=>{
      if(isObject(argumentField)){
        return Object.keys(argumentField)
      }
      return argumentField
    })
  } else {
    return origArguments
  }
}
