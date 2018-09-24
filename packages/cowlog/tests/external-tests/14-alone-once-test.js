const mockData = require('../mockData')
require('../../src/index')('clean');

  ['aaaa', 'bbbb', 'cccc', 'ffff', 'ggggg', 'hhhhh', 'iiii', 'jjjjjj', 'THIS'].forEach(n=>{
  l(n).once()
})
