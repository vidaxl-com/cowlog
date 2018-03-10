const testFunction = function (a, b) {
  return a + b
}

module.exports = {
  abcHash: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
  abcString: 'abcz',
  testInt: 1337,
  testFloat: 1.23,
  threeText: 'three',
  testArray: [1, 2, 'three'],
  testFunction: testFunction,
  testObject1: {
    a: 'b'
  },
  testObject2: {
    c: 1,
    fn: testFunction
  }
}
