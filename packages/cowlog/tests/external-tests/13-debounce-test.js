const mockData = require('../mockData')
require('../../src/index')('clean');

['aaaa', 'bbbb', 'cccc', 'ffff', 'ggggg', 'hhhhh', 'iiii', 'jjjjjj', 'THIS']
  .forEach(letters=>l(letters).debounce(1)())

