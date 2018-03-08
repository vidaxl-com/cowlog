require('../../../index')()
const path = require('path')
const copydir = require('copy-dir').sync
const randomstring = require('randomstring')
const mkdirp = require('mkdirp').sync
const cwd = require('pkg-dir').sync(__dirname)
const directoryExists = require('directory-exists').sync
const emptyDir = require('empty-dir').sync
const recursiveReaddir = require('recursive-readdir-sync')
const fs = require('fs')
const fixturesRoot = path.join(cwd, 'tests/directory-fixtures')
const isEmpty = require('is-empty')

module._fixturePath = function () {
  return path.join(fixturesRoot, module._fixtureDirectory)
}

module._destinationDirecoryRoot = path.join(cwd,
  'tmp',
  'directory-fixture-provider-destination',
  randomstring.generate({
    length: 12,
    charset: 'alphabetic'
  }))

module._fixturePath = function () {
  return path.join(fixturesRoot, module._fixtureDirectory)
}

module.exports = exports = {
  get: function (fixtureDirectory) {
    module._fixtureDirectory = fixtureDirectory
    let fixturePath = module._fixturePath()
    if (!directoryExists(fixturePath)) {
      mkdirp(fixturePath)
    }
    if (emptyDir(fixturePath, function (pathtoIgnore) {
        return !/\.gitkeep/.test(pathtoIgnore)
      })) {
      throw String(`Please put some files to the ${fixturePath} directory,
you might not want to test with no files right?
    `)
    }

    let dir = path.join(module._destinationDirecoryRoot, fixtureDirectory)
    module._destinationDirecory = dir

    mkdirp(dir)
    copydir(fixturePath, dir)

    const returnObject = {
      dir,
      fixturePath,
      fixtureContent: function () {
        return module.loadFiles(fixturesRoot, recursiveReaddir(module._fixturePath()))
      },
      destinationContent: function () {
        return module.loadFiles(module._destinationDirecoryRoot, recursiveReaddir(module._destinationDirecory))
      },
      status: function () {
        const destinationContent = this.destinationContent()
        const fixtureContent = this.fixtureContent()
        const changeList = {}
        const changeNumbers = {deleted: 0, changed: 0, new: 0}
        let changeTotals = 0
        Object.keys(fixtureContent).forEach((fixtureFilePath) => {
          let changed = destinationContent[fixtureFilePath] !== fixtureContent[fixtureFilePath]
          if (changed) {
            changeList[fixtureFilePath] = 'changed'
            changeNumbers.changed++
            changeTotals++
          }
          let deleted = typeof destinationContent[fixtureFilePath] === 'undefined'
          if (deleted) {
            changeList[fixtureFilePath] = 'deleted'
            changeNumbers.deleted++
            changeTotals++
          }
        })
        Object.keys(destinationContent).forEach((destinationFilePath) => {
          if (!fixtureContent[destinationFilePath]) {
            changeList[destinationFilePath] = 'new'
            changeNumbers.new++
            changeTotals++
          }
        })

        const changed = !isEmpty(changeList)
        return {
          paths: {
            destination: module._destinationDirecoryRoot,
            fixtures: fixturesRoot
          },
          changeList,
          changeNumbers,
          changeTotals,
          changed
        }
      }
    }
    returnObject.fixtureContent()
    returnObject.destinationContent()

    return returnObject
  }
}

module.loadFiles = function (directoryRoot, files) {
  let returnValue = {}
  files.forEach(function (file) {
    let relevantPathPiece = file.replace(directoryRoot, '')
    returnValue[relevantPathPiece] = fs.readFileSync(file).toString()
  })

  return returnValue
}
