const { dslFramework, dslFrameworkDefaultInstance } = require('./dsl-framework-factory')
const curryString = 'Hey'
const uCurryBuilder = dslFrameworkDefaultInstance()
const curryObject = uCurryBuilder(1, 2, 3, 4, 5)('a', curryString, 'c')()
const curryCallbackObject = uCurryBuilder(() => {})

module.exports = ({ curryString, uCurryBuilder, curryObject, curryCallbackObject })
