// [require-a-lot] testAsset001 begin
const {
  requireALot, // The entry point of the package
  path, // node module: path
  expect, // *tag* of chai | chai@4.2.0 | http://chaijs.com | BDD/TDD assertion library for node.js and the browser. ...
  logger, // an instance of the cowlog
  sayHelloToName, // A service
  somethingComplex, // A service that is required
}
// [require-a-lot] testAsset001 end
  = require('./requires')()

// { requireALot, path, logger, somethingComplex, sayHelloToName, chai, expect }
{ requireALot, path, logger, somethingComplex, sayHelloToName, expect }

somethingComplex('Erika', true)
