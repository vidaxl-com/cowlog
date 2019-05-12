// [require-a-lot] testAsset001 begin
const {
  rec, //  Removes empty characters from a string |
  randomFactory, // *di factoy* | A factory that is inline defined |
  randomFactory2, // *di factoy* | A factory that is required |
}
// [require-a-lot] testAsset001 end
  = require('./requires')()
module.exports = rec(randomFactory.toString()) === rec(randomFactory2.toString())
