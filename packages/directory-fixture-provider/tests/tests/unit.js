/* eslint-env mocha */
require('chai').should()
const path = require('path')
const expect = require('chai').expect
const cwd = require('pkg-dir').sync(__dirname)
const fixturesRoot = path.join(cwd, 'tests/directory-fixtures')
const isDirectory = require('is-directory')
const shell = require('shelljs')


describe('Testing directory-fixture-provider', function () {

  describe('testing basic functionalities', function () {
    it('checking the created directory', function () {
      const fixtureDirectoryProvider = require('../../src/index')(fixturesRoot)()

      shell.rm('-rf', fixtureDirectoryProvider.tmpSubFolder)

      let fixtureData = fixtureDirectoryProvider.get('./')

      if (!isDirectory.sync(fixtureData.dir)) {
        throw String('Something is terribly worng!')
      }
    })

    it('no changes', function () {
      const fixtureDirectoryProvider = require('../../src/index')(fixturesRoot)()
      let fixtureData = fixtureDirectoryProvider.get('./')
      if (fixtureData.getStatus().changed) {
        throw String('Something is terribly worng!')
      }

      if (fixtureData.getStatus().changeTotals) {
        throw String('Something went terribly worng!')
      }

      if (fixtureData.getStatus().changeNumbers.deleted) {
        throw String('Something went terribly worng!')
      }

      if (fixtureData.getStatus().changeNumbers.changed) {
        throw String('Something went terribly worng!')
      }

      if (fixtureData.getStatus().changeNumbers.new) {
        throw String('Something went terribly worng!')
      }
    })

    it('changes', function () {
      const fixtureDirectoryProvider = require('../../src/index')(fixturesRoot)()
      let fixtureData = fixtureDirectoryProvider.get('./')
      // const destinationFiles = fixtureData.getDestinationFiles()
      describe('More details on file operations', function () {
        it('checks for new file creation', function () {
          shell.touch(path.join(fixtureData.dir, 'totalNewFile'))
          if (!fixtureData.getStatus().changed) {
            throw String('Something is terribly worng!')
          }
          if (fixtureData.getStatus().changeNumbers.new !== 1) {
            throw String('Something went terribly worng!2')
          }
        })
      })

      describe('More details on file operations', function () {
        it('checks for file deletion', function () {
          shell.rm(path.join(fixtureData.dir, 'file-in-the-root'))
          if (!fixtureData.getStatus().changed) {
            throw String('Something is terribly worng!')
          }
          if (fixtureData.getStatus().changeNumbers.deleted !== 1) {
            throw String('Something went terribly worng')
          }
          if (fixtureData.getStatus().changeNumbers.changed !== 1) {
            throw String('Something went terribly worng!')
          }
        })
      })

      describe('More details on file operations', function () {
        it('checks for @changed files', function () {
            let file = path.join(fixtureData.dir, 'directory/README.md')
            shell.rm(file)
            shell.touch(file)
            if (!fixtureData.getStatus().changed) {
                throw String('Something is terribly worng!')
            }
            if (fixtureData.getStatus().changeNumbers.changed !== 2) {
                throw String('Something went terribly worng!')
            }
        })

        it('Copying files to the same space with the "permanent" command', function () {
          let fixtureData = require('../../src/index')(fixturesRoot)('permanent')().get('./')
          fixtureData = require('../../src/index')(fixturesRoot)('permanent')().get('./')

          if (fixtureData.getStatus().changed) {
            throw String('Something is terribly worng!')
          }
          const dir = fixtureData.dir
          shell.rm('-rf', `${dir}*`)
        })

        it('Copying files to the same space with the "permanent" command keeping changed', function () {
          shell.touch(path.join(require('../../src/index')(fixturesRoot)('permanent')().get('./').dir, 'new'))
          fixtureData = require('../../src/index')(fixturesRoot)('permanent')().get('./')

          if (!fixtureData.getStatus().changed) {
            throw String('Something is terribly worng!')
          }
          const dir = fixtureData.dir
          shell.rm('-rf', `${dir}*`)
        })

        it('Copying files to the same space with the "permanent" command ereasing first', function () {
            shell.touch(path.join(require('../../src/index')(fixturesRoot)('permanent', )().get('./').dir, 'new'))
            fixtureData = require('../../src/index')(fixturesRoot)('permanent', 'overwrite')().get('./')

            if (fixtureData.getStatus().changed) {
                throw String('Something is terribly worng!')
            }
            const dir = fixtureData.dir
            shell.rm('-rf', `${dir}*`)
        })

      })
    })
  })
})

