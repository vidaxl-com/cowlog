module.exports = (logger, sayHelloToName, assert) => (name, success = true, mute = true) => {
  try {
    assert(success)
  } catch (e) {
    const log = logger(name, 'unfortunately not success')
    log()
  }

  return ({name, success})
}
