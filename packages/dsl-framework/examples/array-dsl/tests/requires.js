const path = require('path')

module.exports = require('require-a-lot')(require)
  ('../src','assert','chai','require-dir','path')
    .alias('src', 'arrayDsl')
    .log.info.tag("testIncludes")
    .linkDirectory(path.join(__dirname, '../', 'tests'))
    .from('chai', 'expect').removeUnused
    ()
