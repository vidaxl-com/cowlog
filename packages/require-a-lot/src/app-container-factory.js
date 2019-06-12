module.exports = () => require('dsl-framework')()((e, parameters) => {
  return require('../src/container')(parameters)
})
