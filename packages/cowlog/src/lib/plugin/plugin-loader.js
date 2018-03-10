let _ = require('lodash')
let isString = require('is-string')

module.exports = exports = function (container) {
  return function (plugin) {
    plugin = module.req(plugin)
    module.register(plugin, container)
  }
}

module.req = function (plugin) {
  if (isString(plugin)) {
    return require(`../../plugins/${plugin}`)
  } else {
    return plugin
  }
}

module.register = function (plugin, container) {
  let runtimeVariables = container['runtime-variables']
  let registeredPlugins = module.getRegisteredPlugins(runtimeVariables)

  _.each(plugin, function (pluginEvent) {
    if (!registeredPlugins[pluginEvent['name']]) {
      pluginEvent.register(container)
      registeredPlugins[pluginEvent['name']] = pluginEvent
    }
  })

  registeredPlugins[plugin.name] = plugin
}

module.getRegisteredPlugins = function (runtimeVariables) {
  let registeredPlugins = {}
  registeredPlugins = runtimeVariables.registeredPlugins || registeredPlugins

  return registeredPlugins
}
