module.exports = (parameters, results = {}, requireModuleInstance, infoList = {}) => {
  const proxy = require('./proxy')(parameters, results);
  [
    require('./container-methods/define'),
    require('./container-methods/compose'),
    require('./container-methods/create')
  ].forEach(method => method(parameters, infoList, results, requireModuleInstance, proxy))

  return proxy
}
