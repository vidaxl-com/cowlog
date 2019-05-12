// [require-a-lot] testAsset003 begin
const {
  rec, // Removes empty characters from a string
  randomFactory, // A factory that is inline defined
  randomFactory2, // A factory that is required
}
// [require-a-lot] testAsset003 end
  = require('./requires')('testAsset003')
l(rec(randomFactory.toString()),rec(randomFactory2.toString()))()
module.exports = rec(randomFactory.toString()) === rec(randomFactory2.toString())
