// [require-a-lot] testAsset001 begin
const {
  requireALot,
  path, //node module: path
  logger,
  somethingComplex,
}
// [require-a-lot] testAsset001 end
  = require('./requires')

requireALot

path

logger(11).mute()

somethingComplex('Erika', true)

