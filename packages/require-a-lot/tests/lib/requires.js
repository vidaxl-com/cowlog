const requireALot = require('../../src');
const isNyc = process.env.NYC_ROOT_ID;
let anInstanceOfTheCowlog = 'an instance of the cowlog';

module.exports = requireALot(require)(
  '../lib/capture', 'assert', 'cowlog', '../../src', 'require-dir', 'path', 'generic-text-linker')

  .from('chai', ['expect'])

  .alias('../../src', 'requireALot')
  .information('requireALot', 'The main library itself.')

  .define('isNyc', !!isNyc)
  .information('isNyc', 'true if nyc is turned on')

  .compose('executeIfNycIsOff', isNyc => fn => !isNyc && fn())
  .information('executeIfNycIsOff',
    'Executes function if nyc is not running, technically if the test-dev script is runing.')

  .compose('logger', cowlog => l ? l : cowlog().log, 'cowlog')
  .information(['logger', 'l'], anInstanceOfTheCowlog)

  .compose('l', logger => logger)

  .linkDirectory(require('path').join(__dirname, '../', 'tests'))
  .log.info.tag('testRequires')

  .compose('assetDir', (path) => path.join(__dirname, '../assets'))
  .information('assetDir', 'Test assets root directory')

  .compose('diAssetDir', (path, assetDir) => path.join(assetDir, 'dependency-injection'))
  .information('diAssetDir', 'Dependency injection related test assets folder.')

  .removeUnused();
