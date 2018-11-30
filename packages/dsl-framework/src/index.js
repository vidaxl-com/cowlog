const unlimitedCurryFactory = require('./unlimited-curry-factory')
const unlimitedCurryFactoryInitiator = unlimitedCurryFactory(false)(
  (error, parameters) => unlimitedCurryFactory(parameters)
)
module.exports = exports = unlimitedCurryFactoryInitiator()
