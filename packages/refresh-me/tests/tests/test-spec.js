/* eslint-env mocha */
require('cowlog')()
const shell = require('shelljs')
const dfp = require('directory-fixture-provider')
const path = require('path')
const assert = require('assert')
const makeRealSemver = require('../../src/lib/make-real-semver')
const getCurrentBranch = require('../../src/lib/get-current-branch')
const semver = require('semver')
const fixtureDirectoryProvider = dfp(path.join(__dirname, '../assets'))()

describe('Basic Test Suite', function () {
  describe('happy flow', () => {
    it('.happy flow only devDependencies specified in tha package.json', function () {
      const assetRelativePath = 'javascript/only-dev-dependencies/'
      const fixtureData = fixtureDirectoryProvider.get(assetRelativePath).dir
      shell.cd(fixtureData)
      shell.exec(`git init && git add . && git commit -m"just for the test && npm install"`)
      assert(!shell.exec(`${path.join(__dirname, '../../', 'src/index.js')} `).code)
      assert(getCurrentBranch() === 'master', `getCurrentBranch() = '${getCurrentBranch()}'`)
      const originalPackageJson = require(path.join(__dirname, '../', `assets/${assetRelativePath}/package.json`))
      const testPackageJson = require(path.join(fixtureData, '/package.json'))
      assert(semver.lt(
        makeRealSemver(originalPackageJson.devDependencies.cowlog),
        makeRealSemver(testPackageJson.devDependencies.cowlog)))

    }).timeout(50000);

    it('.happy flow no devDependencies specified in tha package.json', function () {
      const assetRelativePath = 'javascript/only-dependencies/'
      const fixtureData = fixtureDirectoryProvider.get(assetRelativePath).dir
      shell.cd(fixtureData)
      shell.exec(`git init && git add . && git commit -m"just for the test && npm install"`)
      assert(!shell.exec(`${path.join(__dirname, '../../', 'src/index.js')} `).code)
      assert(getCurrentBranch() === 'master', `getCurrentBranch() = '${getCurrentBranch()}'`)
      const originalPackageJson = require(path.join(__dirname, '../', `assets/${assetRelativePath}/package.json`))
      const testPackageJson = require(path.join(fixtureData, '/package.json'))
      assert(semver.lt(
        makeRealSemver(originalPackageJson.dependencies.cowlog),
        makeRealSemver(testPackageJson.dependencies.cowlog)))

    }).timeout(50000);

  })
})
