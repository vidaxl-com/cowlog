// [require-a-lot] testAsset001 begin
const {
  requireALot, // The entry point of the package
  path, // node module: path
  logger, // an instance of the cowlog
  somethingComplex, // A factory
}
// [require-a-lot] testAsset001 end
  = require('./requires')

requireALot

path

logger(11).mute()

somethingComplex('Erika', true)

