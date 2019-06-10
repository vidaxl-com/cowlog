// [require-a-lot] testAsset001 begin
const {
  testLib // undefined
}
// [require-a-lot] testAsset001 end
  = require('./requires')()

// { requireALot, path, logger, somethingComplex, sayHelloToName, chai, expect }
module.exports = testLib(1, 2)

