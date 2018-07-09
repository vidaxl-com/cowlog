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

```javascript 1.8
const unlimitedCurry = require('../../src/index')
const uCurryBuilder = unlimitedCurry()

const fn = unlimitedCurry(
        (e, parameters) => {
          // console.log(e, parameters)
          //you can do anything here no return values from here
        },
        parameters=>'Yee'
      )
      const returnValue = await fn('a')('b')('c').p.then(dataReceived=>dataReceived)
      expect(returnValue).to.be.equal('Yee')


```

See the tests for now, or the cowlog project for it's application. More documentation is coming.
