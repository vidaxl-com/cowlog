#!/usr/bin/env node
const diff = require('diff')
const objectPath = require('object-path')
const path = require('path')

const shell = require('shelljs')
const lv = require('latest-version')
const semver = require('semver')
const cwd = process.cwd()

const extracted = (allFine, testBranch, updateLog, name, version) => ({
  allFine,
  testBranch,
  updateLog,
  packageInfo: { name, version }
})

const update = async (dependencies) => {
  const dependencyNames = Object.keys(dependencies)

  let allFine = true
  let testBranch = ''
  let updateLog = []
  for (let i = 0; dependencyNames.length > i; i++) {
    const dependencyName = dependencyNames[i]
    const actualVersion = dependencies[dependencyName].replace('^', '')
    const latestVersion = await lv(dependencyName)
    testBranch = `refreshing-${dependencyName}@${actualVersion}-to-${latestVersion}`
    const update = semver.gt(latestVersion, actualVersion)
    const { name, version } = require(path.join(cwd, 'package.json'))
    const relativePath = objectPath.get(diff.diffChars(shell.exec('git rev-parse --show-toplevel').toString().trim(), cwd), '1.value', false)

    if (update) {
      [
        `git checkout -b ${testBranch}`,
        `npm install ${dependencyName}@${latestVersion}`,
        `npm test`,
        `git add ./package.json`,
        `git commit -m"Updated package ${name} dependency: ${dependencyName}@${actualVersion} ` +
        `to ${latestVersion}."\n\n` +
        `at path:${!relativePath ? './' : relativePath}`,
        `git checkout master`,
        `git merge ${testBranch}`,
        `git branch -D ${testBranch}`
      ].map((command) => {
        allFine && console.log(command)
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
  return { allFine, testBranch, updateLog }
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
    resultsDev = printMessage(await update(packageField.dependencies))
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
