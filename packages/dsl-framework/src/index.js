const unlimitedCurryFactory = require('./core/unlimited-curry-factory')
const unlimitedCurryFactoryInitiator = unlimitedCurryFactory((e, d) => {
  unlimitedCurryFactory.setCoreData(d)
  return unlimitedCurryFactory
})
const inBrowser = !!process.browser

if (inBrowser) {
  window['dslFramework'] = unlimitedCurryFactory
}

const weHaveAmd = typeof define === 'function' && define.amd

if (weHaveAmd) {
  define('dsl-framework', [], function () {
    return unlimitedCurryFactoryInitiator
  })
}

(weHaveAmd || inBrowser) && (() => { window['dslFramework'] = unlimitedCurryFactory })()

module.exports = unlimitedCurryFactoryInitiator

