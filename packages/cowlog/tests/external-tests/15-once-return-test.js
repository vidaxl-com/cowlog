require('../../src/index')('clean');

  ['aaaa', 'bbbb', 'cccc', 'ffff', 'ggggg', 'hhhhh', 'iiii', 'jjjjjj', 'THIS'].forEach(async n=>{
  console.log(
    await l(n)('once')('return')()
    .then(d=>d), '1')
})
