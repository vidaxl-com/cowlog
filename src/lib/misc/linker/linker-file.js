const fs = require('fs')

module.exports = exports = function (file, beginning, closing, newValue = null) {
  const blackList = ['.git', '.svn', 'node_modules', 'dist']
  let blackListed = false
  blackList.forEach(function (pathPart) {
    if(!blackListed && !file.includes(pathPart)){
    } else {
      blackListed = true;
    }
  })
  if(!blackListed) {
    let string = fs.readFileSync(file, {encoding: 'utf8'})
    let result = require('./linker')(string, beginning, closing, newValue)
    let writeFile = (result !== string)

    if (newValue) {
      if (writeFile) {
        fs.writeFileSync(file, result)

        return result
      }
    }

    if (!newValue && result) {

      return result
    }
  }

  return ''
}
