function allKeys (registeredKeys) {
  let allKeys = []
  registeredKeys.forEach((kind) => allKeys = allKeys.concat(Object.keys(kind)))
  return allKeys
}

module.exports = (baseProxy, containerKindData, registeredKeys) => new Proxy(baseProxy,
  {
    get: (obj, prop) => {
      const hidden = prop.startsWith('_')
      if (hidden) {
        const hiddenProp = prop.substring(1)
        const kindData = containerKindData.includes(hiddenProp)
        if (kindData) {
          return registeredKeys[containerKindData.indexOf(hiddenProp)]
        }
        const wantAllKeys = hiddenProp === 'allKeys';
        if (wantAllKeys) {
          return allKeys(registeredKeys);
        }
        const wantDuplicateKeys = hiddenProp === 'duplicateKeys'
        if (wantDuplicateKeys) {
          const allRegisteredKeys = allKeys(registeredKeys)
          const allKeysCnt = {}
          allRegisteredKeys.forEach((key) => {
            allKeysCnt[key] = allKeysCnt[key] ? allKeysCnt[key] + 1 : 1
          })
          const allKeysInAllKeysCnt = Object.keys(allKeysCnt)
          const duplicates = []
          allKeysInAllKeysCnt.forEach((key) => {
            (allKeysCnt[key] > 1) && duplicates.push(key)
          })

          return duplicates
        }
        // todo: implement later
        // const unused = hiddenProp === 'unused';
        // if (unused) {
        //   return allKeys(registeredKeys);
        // }
      }
      return obj[prop]
    }
  })
