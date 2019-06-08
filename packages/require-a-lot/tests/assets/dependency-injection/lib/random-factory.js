module.exports = (one, assert) => {
  const randomValue = Math.floor(Math.random() * Math.floor(100)) + one

  return (someBoolean) => {
    try {
      assert(someBoolean)
      return randomValue
    } catch (e) {
      return false
    }
  }
}
