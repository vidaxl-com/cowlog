// [require-a-lot] testAsset001 begin
  const {
    rec, //  Removes empty characters from a string |
    somethingComplex, // *di service* | A factory that is inline defined |
    somethingComplex4, // *di service* | A service declared without the third parameter, as it reads from the function ...
  }
// [require-a-lot] testAsset001 end
  = require('./requires')()
module.exports = rec(somethingComplex.toString()) === rec(somethingComplex4.toString())
