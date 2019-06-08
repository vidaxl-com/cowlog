// [require-a-lot] testAsset001 begin
const {
  rec // *alias* of ./lib/remove-empty-characters | Removes empty characters from a string |
}
// [require-a-lot] testAsset001 end
  = require('./requires')()
module.exports = rec(randomFactory.toString()) === rec(randomFactory2.toString())
