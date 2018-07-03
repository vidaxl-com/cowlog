<!--- destination qa rewrite begin -->
### QA
[![CircleCI](https://circleci.com/gh/vidaxl-com/cowlog/tree/master.svg?style=svg)](https://circleci.com/gh/vidaxl-com/cowlog/tree/master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/test_coverage)](https://codeclimate.com/github/vidaxl-com/cowlog/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/maintainability)](https://codeclimate.com/github/vidaxl-com/cowlog/maintainability)
<!---
[![Known Vulnerabilities](https://snyk.io/test/github/vidaxl-com/cowlog/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vidaxl-com/cowlog?targetFile=package.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog?ref=badge_shield)
[![Greenkeeper badge](https://badges.greenkeeper.io/vidaxl-com/cowlog.svg)](https://greenkeeper.io/)
-->
<!--- destination qa rewrite end -->

# Installation
```bash
npm install generic-text-linker --save-dev
```

# Motivation
I wanted to have a small unlimited currying solution for functional programming techniques so that I can develop easily
domain specific languages and keep it's application close to the code, and use it different kind of tasks.


# Usage
I present the usage of the library with the example below

## Example

### Basic not always usable example

### A more practical example
```javascript 1.8

const unlimitedCurry = require('../../src/index')
const uCurryBuilder = unlimitedCurry()

let testedFunction = uCurryBuilder(() => {
  testedFunction.p.then((data)=>{
    return flatten(data)[0]
  })
  //do some calculation with the data, I just wil flat it
})
expect(testedFunction).to.be.a('function')
const returnValue = await testedFunction('a')('b').p.then(d=>d)

cowlog.log(returnValue)

//Will print to the console:
_____________________________________________________________________________________________________________
/                                                                                                             \
| 0 Beginnig -------                                                                                          |
| {                                                                                                           |
|   "data.returnArray.0": "a",                                                                                |
|   "data.returnArrayChunks.0.0": "a",                                                                        |
|   getFrom: function (from, dataArgument = null) {                                                           |
|   let workData = dataArgument || this.data                                                                  |
|   let returnArrayChunks = workData.returnArrayChunks.slice(from)                                            |
|   let returnArray = []                                                                                      |
|   returnArrayChunks.forEach(chunkData=>chunkData.forEach(pieceData=>returnArray.push(pieceData)))           |
|   const data = {returnArray, returnArrayChunks}                                                             |
|   let returnObject = {data, getFrom}                                                                        |
|                                                                                                             |
|   return returnObject                                                                                       |
| }                                                                                                           |
| }                                                                                                           |
| 0 End -------                                                                                               |
|                                                                                                             |
| _-_-_-_-_-_-_-_-_-_-_-_                                                                                     |
|                                                                                                             |
| stack trace:/tmp/cowlog/hashes/4b/8156903035ff760bd30c747e5326fb_stack-trace.log                            |
| session log:/tmp/cowlog/hashes/d2/48a7150fe127bb523050eb1a8481e6_session.log                                |
\ logged at:2018-07-03T17:09:03.404Z                                                                          /
-------------------------------------------------------------------------------------------------------------
 \
  \ ..:::::::::.
   ::::::::::::::
  /. `::::::::::::
 O__,_::::::::::

```

See the tests for now, or the cowlog project for it's application. More documentation is coming.
