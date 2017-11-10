module.exports = exports = function (plugin) {
  let sourcePath = ''
  process.env.PROD ? sourcePath = 'dist' : sourcePath = 'src'
  return require(`../../${sourcePath}/index`)(plugin)
}
