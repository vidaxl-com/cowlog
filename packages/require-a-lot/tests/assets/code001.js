// [require-a-lot] testAsset001 begin
const {
  requireALot, //  The entry point of the package |
  path, // *node module*: path | https://nodejs.org/api/path.html |
  expect, // *tag* of chai | chai@4.2.0 | http://chaijs.com | BDD/TDD assertion library for node.js and the browser. ...
  logger, // *di service* | an instance of the cowlog |
  sayHelloToName, // *di service* | A service |
  somethingComplex, // *di service* | A factory that is inline defined |
}
// [require-a-lot] testAsset001 end
  = require('./requires')()

// { requireALot, path, logger, somethingComplex, sayHelloToName, chai, expect }
{ requireALot, path, logger, somethingComplex, sayHelloToName, expect }

somethingComplex('Erika', true)
