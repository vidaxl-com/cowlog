module.exports = exports = function () {
  let sourcePath = ''
  process.env.PROD ? sourcePath = 'dist' : sourcePath = 'src'
  return require(`../../${sourcePath}/index`)()
}