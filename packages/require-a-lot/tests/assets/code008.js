// [require-a-lot] testAsset001 begin
const {
  rec, // Removes empty characters from a string
  randomFactory, // A factory that is inline defined
  randomFactory2, // A factory that is required
}
// [require-a-lot] testAsset001 end
  = require('./requires')()
module.exports = rec(randomFactory.toString()) === rec(randomFactory2.toString())
