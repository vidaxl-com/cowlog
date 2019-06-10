module.exports = (parameters, results = {}, requireModuleInstance, infoList = {}) => {
  const baseProxy = require('./proxy')(parameters, results)
  const containerKindData = ['define', 'compose', 'create']
  const keys = []
  containerKindData.forEach((kind, index) => {
    keys.push(require(`./container-methods/${containerKindData[index]}`))
  })
  const registeredKeys = keys.map(method => method(parameters, infoList, results,
    requireModuleInstance, baseProxy))
  const objectKeys = {}
  containerKindData.forEach((kind, index) => {
    objectKeys[kind] = keys[index]
  })
  const notHiddenVariablesReaches = {}
  return require('./proxy/hidden-tags-proxy')(notHiddenVariablesReaches)(baseProxy, containerKindData, registeredKeys, keys)
};
