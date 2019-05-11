const requireALot = require('../../../src')

module.exports = requireALot(require)('assert', 'cowlog', '../../../src', 'require-dir', 'path')
  .from('chai', ['expect'])
  .alias('src', 'requireALot')
  .compose('logger', cowlog => cowlog().log, 'cowlog')
  .compose('sayHelloToName', (logger) => (name) => logger(`hello ${name}`)(), 'logger')
  .compose('somethingComplex', (logger, sayHelloToName, assert) => (name, success = true, mute = true) => {
    mute || sayHelloToName(name)
    try {
      assert(success)
    } catch (e) {
      const log = logger(name, 'unfortunately not success')
      log()
    }

    return ({name, success})
  }, ['logger', 'sayHelloToName', 'assert'])
  .linkDirectory(__dirname)
  .log.info.tag('testAsset001')
  .removeUnused()
