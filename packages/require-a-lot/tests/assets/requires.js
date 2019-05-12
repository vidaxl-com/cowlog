const requireALot = require('../../src/index')

module.exports = (tag = 'testAsset001') => requireALot(require)(
  'assert', 'cowlog', '../../src', 'require-dir', 'path', 'chai', './lib/remove-empty-characters')
  .from('chai', ['expect'])

  .define('one', 1)

  .alias('../../src', 'requireALot')
  .information('requireALot', 'The entry point of the package')

  .alias('./lib/remove-empty-characters', 'rec')
  .information('rec', 'Removes empty characters from a string')

  .compose('logger', cowlog => cowlog().log, 'cowlog')
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

    return ({name, success})
  }, ['logger', 'sayHelloToName', 'assert'])
  .information('somethingComplex', 'A factory that is inline defined')

  .compose('somethingComplex2', require('./lib/something-complex-two'), ['logger', 'sayHelloToName', 'assert'])
  .information('somethingComplex', 'A service that is required')

  .create('randomFactory', (one, assert) => {
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
  .information('randomFactory', 'A factory that is inline defined')

  .create('randomFactory2', './lib/random-factory', ['one', 'assert'])
  .information('randomFactory2', 'A factory that is required')


  .linkDirectory(__dirname)
  .log.info.tag(tag)
  .removeUnused()
