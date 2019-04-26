const d3 = require('d3-array')

const geTag = (arrifyOn, result, transformer) => (tag) => (tagArgument) => () =>
  !tagArgument
    ? transformer[tag](result)
    : transformer[tag](result, tagArgument)

module.exports = (result, commandArguments, arrifyOn) => {
  const d3Handler = geTag(arrifyOn, result, d3)
  return {
  'min': d3Handler('min')(),
  'max': d3Handler('max')(),
  'extent': d3Handler('extent')(),
  'sum': d3Handler('sum')(),
  'median': d3Handler('median')(),
  'quantile': d3Handler('quantile')(commandArguments),
  'variance': d3Handler('variance')(),
  'deviation': d3Handler('deviation')(),
}}

// module.exports = (result, commandArguments, arrifyOn) => {
//   const d3Handler = geTag(arrifyOn, result, d3)
//   return new Proxy({}, {
//     get: (obj, prop) => {
//       const tags = ['min', 'max', 'extent', 'sum', 'median', 'quantile', 'variance', 'deviation']
//       // l(tags.some(e => e === prop))()
//       // l(d3Handler(prop)()())()
//       return tags.some(e => e === prop) ?
//         Object.keys(commandArguments).length?
//           d3Handler(prop)(commandArguments) :
//           d3Handler(prop)() :
//         ()=>result
//     }
//   })
// }
