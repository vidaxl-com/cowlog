const diff = require('diff');

function getAllKeys(registeredKeys) {
  let allKeys = [];
  registeredKeys.forEach((kind) => allKeys = allKeys.concat(Object.keys(kind)));
  return allKeys
}

module.exports = (notHiddenVariablesReaches) => (baseProxy, containerKindData, registeredKeys) => new Proxy(baseProxy,
  {
    get: (obj, prop) => {
      const hidden = prop.startsWith('_');
      if (!hidden) {
        notHiddenVariablesReaches[prop] = notHiddenVariablesReaches[prop] ? notHiddenVariablesReaches[prop] + 1 : 1
      }
      if (hidden) {
        const hiddenProp = prop.substring(1);
        const kindData = containerKindData.includes(hiddenProp);
        if (kindData) {
          return registeredKeys[containerKindData.indexOf(hiddenProp)]
        }
        const wantAllKeys = hiddenProp === 'allKeys';
        if (wantAllKeys) {
          return getAllKeys(registeredKeys);
        }
        const wantDuplicateKeys = hiddenProp === 'duplicateKeys';
        if (wantDuplicateKeys) {
          const allRegisteredKeys = getAllKeys(registeredKeys);
          const allKeysCnt = {};
          allRegisteredKeys.forEach((key) => {
            allKeysCnt[key] = allKeysCnt[key] ? allKeysCnt[key] + 1 : 1
          });
          const allKeysInAllKeysCnt = Object.keys(allKeysCnt);
          const duplicates = [];
          allKeysInAllKeysCnt.forEach((key) => {
            (allKeysCnt[key] > 1) && duplicates.push(key)
          });

          return duplicates
        }
        // todo: implement later
        const unused = hiddenProp === 'unused';
        if (unused) {
          const usedSoFar = Object.keys(notHiddenVariablesReaches)
          let unusedKeys = getAllKeys(registeredKeys)
          usedSoFar.forEach((key) => {unusedKeys = unusedKeys.filter((k) => k !== key)})
          return unusedKeys
        }

        const undefinedUsage = hiddenProp === 'undefined'
        if (undefinedUsage) {
          const usedSoFar = Object.keys(notHiddenVariablesReaches)
          const allKeys = getAllKeys(registeredKeys)
          return usedSoFar.map((usedKey) => allKeys.indexOf(usedKey) < 0 ? usedKey: false)
            .filter((k) => k !== false)
        }
      }
      return obj[prop]
    }
  })
