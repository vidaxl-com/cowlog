// [require-a-lot] testAsset001 begin
const {
  addNumbers // undefined
}
// [require-a-lot] testAsset001 end
  = require('./requires')()

// { requireALot, path, logger, somethingComplex, sayHelloToName, chai, expect }
module.exports = addNumbers(1, 2)

