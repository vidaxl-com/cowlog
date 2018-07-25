let _ = require('lodash')
let isString = require('is-string')

module.exports = exports = function (container) {
  return function (plugin) {
    plugin = module.req(plugin)
    module.register(plugin, container)
  }
}

module.req = function (plugin) {
  let isPluginAStringReference = isString(plugin)
    /* istanbul ignore else */
  if (isPluginAStringReference) {
    return require(`../../plugins/${plugin}`)
  }
  /* istanbul ignore else */
  if(!isPluginAStringReference) {
    return plugin
  }
}

module.register = function (plugin, container) {
  let runtimeVariables = container['runtime-variables']
  let registeredPlugins = module.getRegisteredPlugins(runtimeVariables)

  _.each(plugin, function (pluginEvent) {
    /* istanbul ignore else */
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
