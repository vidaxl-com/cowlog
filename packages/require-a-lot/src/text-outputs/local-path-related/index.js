module.exports = (loclalPath, noPackageInfo, infoList, name, info, infoListIndex, from, alias, lokalPackageName,
  libraryToRequire, information) => {
  require('./local-path')(loclalPath, noPackageInfo, infoList, name, lokalPackageName, libraryToRequire)
  require('./not-local-path')(loclalPath, noPackageInfo, infoList, name, info, infoListIndex, from, alias,
    libraryToRequire)

  // information[0][0] && l(
  //   loclalPath,
  //   noPackageInfo,
  //   infoList,
  //   name,
  //   info,
  //   infoListIndex,
  //   from,
  //   alias,
  //   lokalPackageName,
  //   libraryToRequire,
  //   information)();

  if(alias[0] && alias[0][1] && information[0] && information[0][1] && alias[0][1] === information[0][0]) {
    infoList[information[0][0]] = `// ${information[0][1]}`
    l(infoList[information[0][0]])()
  }
}
