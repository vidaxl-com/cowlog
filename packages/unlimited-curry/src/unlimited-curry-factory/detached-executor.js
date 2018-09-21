module.exports = exports = (data, callback) => {
  let timeoutSate = null
  if (callback && typeof callback === 'function') {
    timeoutSate = setTimeout(callback, 0, 2, data)
  }
  return timeoutSate
}
