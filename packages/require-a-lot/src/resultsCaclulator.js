const camelCase = require('camelcase')
const { getInstalledPathSync } = require('get-installed-path')
const path = require('path')
const { linkerDir, linkerFile } = require('generic-text-linker')
const { tokenize } = require('esprima')
const fs = require('fs')

module.exports = (requireModuleInstance, parameters, secondArguments) => (results = {}, infoList = []) =>{
  const noPackageInfo = []
  const alias = parameters.arguments('alias', 'allEntries', [])
  const from = parameters.arguments('from', 'allEntries', [[[]]])
  const tag = parameters.arguments('tag', 'lastArgument')
  const linkDirectory = parameters.arguments('linkDirectory', 'lastArgument')
  const info = parameters.command.has('info')
  const maxLineWidth = parameters.arguments('maxLineWidth', 'lastArgument', 120)
  const removeUnused = parameters.command.has('removeUnused')

  Array.from(secondArguments).map(libraryToRequire => (() => {
  let name = libraryToRequire
  let infoListIndex = libraryToRequire
  const localpackage = libraryToRequire.includes('.')
  const lokalPackageName = name.slice(name.lastIndexOf('/') + 1, name.last)
  if (localpackage) {
    noPackageInfo.push(name)
    infoList[camelCase(lokalPackageName)] = `//reative path: ${libraryToRequire}`
  }
  if (!localpackage) {
    // infoListIndex = `${name}`
    const pi = require(path.join(path.join(getInstalledPathSync(name, { local: true }), 'package.json')))
    let homepage = pi.homepage
    let description = pi.description
    homepage = homepage ? `${homepage}` : 'no homepage'
    description = description ? `${description}` : 'no description'
    const infoData = info ? `${pi.name}@${pi.version} | ${homepage} | ${description}` : ''
    infoList[infoListIndex] = info ? `//` + infoData : ''

    from.forEach(fromLibrary => {
      const libraryTags = fromLibrary[1]
      const originalLibraryName = fromLibrary[0]
      if (originalLibraryName === name) {
        libraryTags.forEach(library => {
          infoList[libraryTags] = info ? `//*tag* of ${name} | ${infoData}` : ''
        })
      }
    })

    alias.forEach(alias => {
      const originalLibraryName = alias[0]
      const aliasName = alias[1]
      if (aliasName && originalLibraryName === name) {
        infoList[aliasName] = info ? `//*alias* of ${name} | ${infoData}` : ''
      }
    })
  }
  const obj = {}
  if (!localpackage) {
    obj[camelCase(name)] = requireModuleInstance(libraryToRequire)
  }
  if (localpackage) {
    obj[camelCase(lokalPackageName)] = requireModuleInstance(libraryToRequire)
  }
  alias.forEach(alias => {
    const originalLibraryName = alias[0]
    const aliasName = alias[1]
    const realIndex = localpackage ? lokalPackageName : name
    const index = camelCase(realIndex)
    if (originalLibraryName === realIndex) {
      obj[aliasName] = obj[index]
      delete obj[index]
    }
  })

  from.forEach(fromLibrary => {
    const libraryTags = fromLibrary[1]
    const originalLibraryName = fromLibrary[0]

    if (originalLibraryName && name === originalLibraryName && libraryTags && Array.isArray(libraryTags)) {
      libraryTags.forEach(tag => { obj[tag] = obj[name][tag] })
    }
  })

  return obj
})())
  .forEach(partialResult => {
    results = Object.assign(results, partialResult)
  })

  parameters.arguments('hide', 'allEntries', [[]]).forEach((row) => row.forEach(item => {
    delete results[item]
  }))

  return({results, noPackageInfo, infoList})
}
