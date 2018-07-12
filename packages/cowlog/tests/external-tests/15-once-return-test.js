require('../../src/index')('clean');

  ['aaaa', 'bbbb', 'cccc', 'ffff', 'ggggg', 'hhhhh', 'iiii', 'jjjjjj', 'THIS'].forEach(n=>{
  console.log(
    l(n)('once')('return')(), '1')
})
