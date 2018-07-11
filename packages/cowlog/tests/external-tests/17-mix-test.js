require('../../src/index')('clean');

  ['aaaa', 'bbbb', 'cccc', 'ffff', 'ggggg', 'hhhhh', 'iiii', 'jjjjjj', 'THIS']
  .forEach(letters=>l(letters)('throttle', 200)())

l('a')()

l('b')('throtle', 2000)()
l('b')('throtle', 2000)()
l('b')('throtle', 2000)()
l('b')('throtle', 2000)()

//thodo write tests for it

