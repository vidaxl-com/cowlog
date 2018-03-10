// require('../../../index')()
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
const diff = require('diff')
const Bottle = require('bottlejs')

module.getFixturePath = function () {
  return path.join(fixturesRoot, module._fixtureDirectory)
}

module._destinationDirecoryRoot = path.join(cwd,
  'tmp',
  'directory-fixture-provider-destination',
  randomstring.generate({
    length: 12,
    charset: 'alphabetic'
  }))

module.getFixturePath = function () {
  return path.join(fixturesRoot, module._fixtureDirectory)
}

module.getFixtureContent = function () {
  return module.loadFiles(
    fixturesRoot, recursiveReaddir(module.getFixturePath())
  )
}

module.contentsFactory = (rootFolder, filesArray) => {
  return () => {
    let returnObject = {}

    filesArray.forEach((filePath) => {
      let fullFilePath = rootFolder ? path.join(rootFolder, filePath) : filePath

      if (fs.existsSync(fullFilePath)) {
        returnObject[filePath] = fs.readFileSync(fullFilePath).toString()
      } else {
        returnObject[filePath] = null
      }
    })

    return returnObject
  }
}

module.exports = exports = {
  get: function (fixtureDirectory) {
    module._fixtureDirectory = fixtureDirectory
    let fixturePath = module.getFixturePath()
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
      getFixtureFiles: function () {
        return module.loadFiles(fixturesRoot, recursiveReaddir(module.getFixturePath()))
      },
      getDestinationFiles: function () {
        return module.loadFiles(module._destinationDirecoryRoot, recursiveReaddir(module._destinationDirecory))
      },
      getStatus: function () {
        const destinationContent = this.getDestinationFiles()
        const fixtureContent = this.getFixtureFiles()
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
        let returnObject = {
          paths: {
            destination: module._destinationDirecoryRoot,
            fixtures: fixturesRoot
          },
          changeList,
          changeNumbers,
          changeTotals,
          contents: module.contentsFactory(module._destinationDirecoryRoot, Object.keys(changeList))(),
          changed
        }

        const diffTool = new Bottle()

        let diffParameters = {
          changed,
          changedContents: returnObject.contents
        }

        diffTool.service('parameters', function () {
          return diffParameters
        })

        diffTool.service('getDiff', function (parameters) {
          // l(parameters.changedContents)

          // return String("AAA")
        }, 'parameters')

        diffTool.service('diffTool', function (parameters) {

        }, 'parameters')

        returnObject.diffTool = diffTool.container

        return returnObject
      }
    }
    returnObject.getFixtureContent = module.getFixtureContent

    // l(returnObject.getStatus().diffTool.getDiff)//('die')

    return returnObject
  }
}

module.loadFiles = function (directoryRoot, files) {
  let returnValue = {}
  files.forEach(function (file) {
    let relevantPathPiece = file.replace(directoryRoot, '')
    returnValue[relevantPathPiece.slice(1, relevantPathPiece.length)] = fs.readFileSync(file).toString()
  })

  return returnValue
}
