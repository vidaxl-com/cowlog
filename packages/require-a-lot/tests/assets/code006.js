// [require-a-lot] testAsset001 begin
const {
  rec, // Removes empty characters from a string
  somethingComplex, // A factory that is inline defined
  somethingComplex4, // A service declared without the third parameter, as it reads from the function definition, of ...
}
// [require-a-lot] testAsset001 end
  = require('./requires')()
module.exports = rec(somethingComplex.toString()) === rec(somethingComplex4.toString())
