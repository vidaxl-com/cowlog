const fs = require('fs')

module.exports = exports = function (file, beginning, closing, newValue) {
  let string = fs.readFileSync(file, {encoding: 'utf8'})
  let result = require('./linker')(string, beginning, closing, newValue)
  let weHaveToChangeTheFile = result !== string
  if(weHaveToChangeTheFile){
    fs.writeFileSync(file, result)
    return result
  }
  if (!weHaveToChangeTheFile){
    return ''
  }
}
