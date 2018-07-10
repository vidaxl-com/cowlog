const readdir = require('recursive-readdir-sync')

module.exports = exports = function (rootDir) {
  let files = readdir(rootDir)
  const blackList = ['.git', '.svn', 'node_modules', 'dist', 'tests/fixtures']
  let fileList = []
  files.forEach(function (file) {
    let blackListed = false
    blackList.forEach(function (pathPart) {
      if (!blackListed && !file.includes(pathPart)) {
      } else {
        blackListed = true
      }
    })
    /* istanbul ignore else */
    if (!blackListed) {
      fileList.push(file)
    }
  })

  return fileList
}
