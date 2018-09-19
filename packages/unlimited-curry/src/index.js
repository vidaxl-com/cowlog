

const unlimitedCurryFactory = require('./unlimited-curry-factory')

unlimitedCurryFactoryInitiator = unlimitedCurryFactory()((error, data) => unlimitedCurryFactory(data))

module.exports = exports = unlimitedCurryFactoryInitiator()

exports.extra = unlimitedCurryFactoryInitiator

