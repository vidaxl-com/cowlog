const { linkerDir, linkerFile } = require('generic-text-linker')
const trimRight = require('trim-right')
const fs = require('fs')

module.exports = (linkFile, begin, end, msg, emptySpaces) => {
  msg = msg.split('\n').map(line => trimRight(line)).join('\n')
  return typeof linkFile === 'string'
    ? fs.lstatSync(linkFile).isDirectory()
      ? linkerDir(linkFile, begin, end, msg.split('\n').map(line => emptySpaces + line).join('\n'))
      : linkerFile(linkFile, begin, end, msg.split('\n').map(line => emptySpaces + line).join('\n'))
    : {}
}
