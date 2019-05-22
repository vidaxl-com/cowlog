const shell = require('shelljs')
module.exports = (directory) => {
  const cwd = shell.cwd
  directory && shell.cd(directory)
  const output = shell.exec(`git rev-parse --abbrev-ref HEAD`).trim()
  directory && shell.cd(cwd)

  return output
}
