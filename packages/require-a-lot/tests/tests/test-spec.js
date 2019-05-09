/* eslint-env mocha */
require('cowlog')()
// [require-a-lot] testRequires begin
const {
  requireDir,
  path, //node module: path
}
// [require-a-lot] testRequires end
= require('../lib/requires')

// require('../assets/001/requires')

requireDir(path.join(__dirname, 'flow'))

module.exports=(parameter)=>parameter
