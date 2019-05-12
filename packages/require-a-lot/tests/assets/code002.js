// [require-a-lot] testAsset002 begin
const {
  rec, // Removes empty characters from a string
  somethingComplex, // A factory that is required
  somethingComplex2,
}
// [require-a-lot] testAsset002 end
  = require('./requires')('testAsset002')

module.exports = rec(somethingComplex.toString()) === rec(somethingComplex2.toString())
