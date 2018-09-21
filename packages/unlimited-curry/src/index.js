const unlimitedCurryFactory = require('./unlimited-curry-factory')
const unlimitedCurryFactoryInitiator = unlimitedCurryFactory(false, true)(
  (error, parameters) => unlimitedCurryFactory(parameters)
)
module.exports = exports = unlimitedCurryFactoryInitiator()
exports.extra = unlimitedCurryFactoryInitiator
