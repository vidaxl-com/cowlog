#!/usr/bin/env node
const diff = require('diff')
const objectPath = require('object-path')
const path = require('path')

const shell = require('shelljs')
const lv = require('latest-version')
const semver = require('semver')
const cwd = process.cwd()
const makeRealSemver = require('./lib/make-real-semver')
const getCurrentBranch = require('./lib/get-current-branch')

const extracted = (allFine, testBranch, updateLog, name, version) => ({
  allFine,
  testBranch,
  updateLog,
  packageInfo: { name, version }
})
const relativePath = objectPath.get(diff.diffChars(shell.exec('git rev-parse --show-toplevel').trim(), cwd), '1.value', false)

const getCommandSequence = (type = 'javascript') => {
  if (type === 'javascript') {
    return (relativePath, name, dependencyName, actualVersion, latestVersion, testBranch) => {
      const currentBranch = getCurrentBranch()
      const modParams = {
        // actualVersion,
        latestVersion, testBranch }
      // Sometimes it puts a space after the version number in the name of the test branch.
      Object.keys(modParams).forEach(tagName => {
        modParams[tagName] = modParams[tagName].replace(/\s/g, '')
      })

      return [
        `git checkout -b ${testBranch}`,
        `npm install ${dependencyName}@${modParams.latestVersion}`,
        `npm test`,
        `git add package.json `,
        `git commit --no-verify -m "Updated package ${name} dependency to: ${dependencyName}@${latestVersion}."`, // +
        // `at path:${!relativePath ? './' : relativePath}`,
        `git checkout ${currentBranch}`,
        `git merge ${modParams.testBranch}  --no-verify`,
        `git branch -D ${modParams.testBranch}`
      ]
    }
  }
}

const update = async (dependencies) => {
  if (dependencies) {
    const dependencyNames = Object.keys(dependencies)

    let allFine = true
    let testBranch = ''
    let updateLog = []
    for (let i = 0; dependencyNames.length > i; i++) {
      const dependencyName = dependencyNames[i]
      const actualVersion = makeRealSemver(dependencies[dependencyName])
      const latestVersion = await lv(dependencyName)
      testBranch = `refreshing-${dependencyName}@${actualVersion}-to-${latestVersion}`
      const update = semver.gt(latestVersion, actualVersion)
      const { name, version } = require(path.join(cwd, 'package.json'))
      const commandSequience = getCommandSequence()(relativePath, name, dependencyName, actualVersion, latestVersion,
        testBranch)
      if (update) {
        commandSequience.map((command) => {
          allFine && console.log(`-= ${command} =-`)
          allFine || console.log(updateLog.join('\n'))
          return allFine
            ? (() => {
              updateLog.push(command)
              return !shell.exec(command).code
            })()
              ? allFine
              : (() => {
                allFine = false
                console.log(`chain broke at: ${command}`)
                return extracted(allFine, testBranch, updateLog, name, version)
              })()
            : (() => extracted(allFine, testBranch, updateLog, name, version))()
        })
      }

      if (!allFine) {
        break
      }
    }

    return extracted(allFine, testBranch, updateLog, '', '')
  }
  return extracted(true, '', [], '', '')
}

const printMessage = (result) => {
  console.log(result.updateLog.join('\n'))
  return result
}

module.exports = (async () => {
  const packageField = require(path.join(cwd, 'package.json'))
  const results = printMessage(await update(packageField.dependencies))
  let resultsDev = false
  if (results.allFine) {
    resultsDev = printMessage(await update(packageField.devDependencies))
  }
  printMessage(results)
  resultsDev && printMessage(resultsDev)
  if (resultsDev && resultsDev.allFine) {
    console.log('-= Great success! =-')
  }

  if (!(results.allFine && results.allFine)) {
    console.log('-= You have something to fix! =-')
  }
})()
