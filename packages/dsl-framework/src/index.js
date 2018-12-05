// require('cowlog')()
const unlimitedCurryFactory = require('./core/unlimited-curry-factory')
const unlimitedCurryFactoryInitiator = unlimitedCurryFactory(true)(
  (error, parameters) => unlimitedCurryFactory(parameters)
)
module.exports = exports = unlimitedCurryFactoryInitiator
