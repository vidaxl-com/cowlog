// [require-a-lot] testAsset001 begin
const {
  somethingComplex, // A factory that is inline defined
  somethingComplex4, // A service declared without the third parameter, as it reads from the function definition, of ...
}
// [require-a-lot] testAsset001 end
  = require('./requires')()
module.exports = JSON.stringify(somethingComplex('e', true)) === JSON.stringify(somethingComplex4('e', true))
