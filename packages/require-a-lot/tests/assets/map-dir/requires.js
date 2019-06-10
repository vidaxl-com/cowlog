const requireALot = require('../../../src')

/**
 *
 * @param tag just for the sake of the tests, it is not required in real life.
 */
module.exports = (tag = 'testAsset001') => requireALot(require)(
  'assert', 'cowlog', '../../../src', 'require-dir', 'path', 'chai')
  .from('chai', ['expect'])

  .define('one', 1)
  .information('one', 'A constant representing 1')
  .define('n1', 2)
  .define('n10', 22)
  .define('n100', 2)
  .define('n10000', 22)

  .compose('logger', cowlog => typeof l === 'undefined' ? cowlog().log : l, 'cowlog')
  .information('logger', 'an instance of the cowlog')

  .compose('sayHelloToName', (logger) => (name) => logger(`hello ${name}`)(), 'logger')
  .information('sayHelloToName', 'A service')

  .compose('somethingComplex', (logger, sayHelloToName, assert) => (name, success = true, mute = true) => {
    try {
      assert(success)
    } catch (e) {
      const log = logger(name, 'unfortunately not success')
      log()
    }

    return ({ name, success })
  }, ['logger', 'sayHelloToName', 'assert'])
  .information('somethingComplex', 'A factory that is inline defined')

  .compose('somethingComplex5', (randomFactory) => randomFactory(true))
  .information('somethingComplex5', 'A service that contains a factory as parameter')

  .create('random', (one, assert) => {
    const randomValue = Math.floor(Math.random() * Math.floor(100)) + one

    return (someBoolean) => {
      try {
        assert(someBoolean)
        return randomValue
      } catch (e) {
        return false
      }
    }
  }, ['one', 'assert'])
  .information('random', 'A factory that is inline defined')

  .linkDirectory(__dirname)
  .log.info.tag(tag)

  .alias('src', 'requireALot')
  .information('requireALot', 'The entry point of the package')

  .mapDir(require('path').join(__dirname, 'dir'))
  .removeUnused()
