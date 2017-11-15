const fs = require('fs')

module.exports = exports = function (file, beginning, closing, newValue) {
  let string = fs.readFileSync(file, {encoding: 'utf8'})
  let result = require('./linker')(string, beginning, closing, newValue)
  fs.writeFileSync(file, result)

  return result
}
