const mockData = require('../mockData')
let runner = require('../lib/test-runner')(false, 'clean')
runner.md.header = 'Logging a string'
runner.md.javascript = `
const cowlog = require("@vidaxl/cowlog")('clean)\`;

cowlog.log('${mockData.abcString}')\`;
`
runner.print(mockData.abcString)
