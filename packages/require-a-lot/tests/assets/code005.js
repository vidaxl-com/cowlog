// [require-a-lot] testAsset001 begin
const {
  rec, // Removes empty characters from a string
  somethingComplex, // A factory that is inline defined
  somethingComplex3, // A service that is reffered as relative path
}
// [require-a-lot] testAsset001 end
  = require('./requires')()
module.exports = rec(somethingComplex.toString()) === rec(somethingComplex3.toString())
