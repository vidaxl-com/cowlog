// yep funny filename, but this is what it is.
const RETURN_FROM_PROMISE = 1

module.exports = exports = (state, callback) => () => new Promise((resolve, reject) => {
  clearTimeout(state.timeoutSate)
  const clonedState = state.clone()
  let ret = false
  const data = clonedState.getData()
  if (typeof callback === 'function') {
    ret = callback(RETURN_FROM_PROMISE, data)
  } else {
    ret = data
  }
  state.resetMe = true

  return resolve(ret)
})
