let _ = require('lodash')
module.exports = exports = function (container) {
  return function (plugin) {
    _.each(plugin, function (pluginEvent) {
      pluginEvent(container)
    })
  }
}