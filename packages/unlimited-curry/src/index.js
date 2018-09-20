const unlimitedCurryFactory = require('./unlimited-curry-factory')
unlimitedCurryFactoryInitiator = unlimitedCurryFactory(false, true)(
  (error, parameters) => unlimitedCurryFactory(parameters)
)
module.exports = exports = unlimitedCurryFactoryInitiator()
exports.extra = unlimitedCurryFactoryInitiator

