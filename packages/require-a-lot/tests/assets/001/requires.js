const requireALot = require('../../../src')

module.exports = requireALot(require)
( 'assert', 'cowlog', '../../../src', 'require-dir', 'path')
  .from('chai',['expect'])
  .alias('src', 'requireALot')
  .linkDirectory(__dirname)
  .log.info.tag('testAsset001')
  .removeUnused()
