module.exports = (result, commandArguments, arrifyOn = false) => {
  const arrayFunctions = require('./functionality/array-functions')(result, commandArguments, arrifyOn)
  const setOperations = require('./functionality/set-operations')(result, commandArguments, arrifyOn)
  const orderRelated = require('./functionality/order-related')(result, commandArguments, arrifyOn)
  const statistics = require('./functionality/statistics')(result, commandArguments, arrifyOn)
  const other = require('./functionality/other')(result, commandArguments, arrifyOn)
  return new Proxy({
    arrayFunctions,
    setOperations,
    orderRelated,
    other,
    statistics
  },
  {
    // get: (obj, prop) => prop in obj ? obj[prop] : result
    get: (obj, prop) => {
      const keys = Object.keys(obj)
      const key = keys.find(key => !!obj[key][prop])
      return prop in obj[key] ? obj[key][prop] : result
    }
  }
  )
}
