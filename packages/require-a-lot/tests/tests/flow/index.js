// [require-a-lot] testRequires begin
const {
  requireDir,
  path, //node module: path
}
// [require-a-lot] testRequires end
= require('../../lib/requires')

requireDir(path.join(__dirname, 'chain-calls'))
