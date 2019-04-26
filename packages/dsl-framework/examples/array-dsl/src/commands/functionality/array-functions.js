module.exports = (result, commandArguments, arrifyOn) => ({
      'sort': () => result.sort(),
      'reverse': () => result.reverse(),
      'slice': () => result.slice(...commandArguments),
    })
