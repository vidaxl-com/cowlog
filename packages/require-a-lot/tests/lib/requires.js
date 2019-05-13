const requireALot = require('../../src')
const path = require('path')
const isNyc = process.env.NYC_ROOT_ID
let anInstanceOfTheCowlog = 'an instance of the cowlog'

module.exports = requireALot(require)(
  '../lib/capture', 'assert', 'cowlog', '../../src', 'require-dir', 'path', 'generic-text-linker')

  .from('chai', ['expect'])

  .alias('../../src', 'requireALot')
  .information('requireALot', 'The main library itself.')

  .define('isNyc', !!isNyc)
  .information('isNyc', 'true if nyc is turned on')

  .compose('executeIfNycIsOff', isNyc => fn => !isNyc && fn())
  .information('executeIfNycIsOff', 'Executes function if nyc is not running, technically if the test-dev script is ' +
    'runing.')

  .compose('logger', cowlog => l ? l : cowlog().log, 'cowlog')
  .information(['logger', 'l'], anInstanceOfTheCowlog)

  .compose('l', logger => logger)

  .linkDirectory(path.join(__dirname, '../', 'tests'))
  .log.info.tag('testRequires')
  .removeUnused()
