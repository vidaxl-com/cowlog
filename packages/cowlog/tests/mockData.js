const testFunction = function (a, b) {
  return a + b
}
const testObject2 = {
  c: 1,
  fn: testFunction
};

const embededObject= {
    a: 'A',
        embeded:{
        level1:{
            level2:{
                c: null,
                    c2: 'cc',
                    array: [
                    {a: 'a', b: 'b'},
                    1,
                    1,
                    3,
                    7],
                    testObject2
            },
            b: '1.5'
        }
    }
}

const longString = 'This is a very long text. Indeed, it has to be long enough to be able to present how awesomely it breaks the strings so that you will have a convenient reading experience through your logs.'
module.exports = {
  abcHash: '900150983cd24fb0d6963f7d28e17f72',
  abcString: 'abcz',
  testInt: 1337,
  testFloat: 1.23,
  threeText: 'three',
  testArray: [1, 2, 'three'],
  longString,
  testFunction,
  testObject1: {
    a: 'b'
  },
  testObject2,
  embededObject
}
