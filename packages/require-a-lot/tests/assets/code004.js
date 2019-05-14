// [require-a-lot] testAsset001 begin
  const {
    rec, //  Removes empty characters from a string |
    somethingComplex, // *di service* | A factory that is inline defined |
    somethingComplex2, // *di service* | A service that is required |
  }
// [require-a-lot] testAsset001 end
  = require('./requires')()
module.exports = rec(somethingComplex.toString()) === rec(somethingComplex2.toString())
