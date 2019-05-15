// [require-a-lot] testAsset001 begin
const {
  random, // *di factoy result*  | A factory that is inline defined |
  random2, // *di factoy result*  | A factory that is required |
  rec, //  Removes empty characters from a string |
}
// [require-a-lot] testAsset001 end
  = require('./requires')()
module.exports = rec(random.toString()) === rec(random2.toString())
