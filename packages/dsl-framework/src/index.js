const unlimitedCurryFactory = require('./core/unlimited-curry-factory')
const unlimitedCurryFactoryInitiator = unlimitedCurryFactory((e, d) =>{
  unlimitedCurryFactory.setCoreData(d)
  return unlimitedCurryFactory
})
module.exports = unlimitedCurryFactoryInitiator

