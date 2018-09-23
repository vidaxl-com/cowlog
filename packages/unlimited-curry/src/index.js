const unlimitedCurryFactory = require('./unlimited-curry-factory/core/index')
const unlimitedCurryFactoryInitiator = unlimitedCurryFactory(false, true)(
  (error, parameters) => unlimitedCurryFactory(parameters)
)
module.exports = exports = unlimitedCurryFactoryInitiator()
exports.extra = unlimitedCurryFactoryInitiator
