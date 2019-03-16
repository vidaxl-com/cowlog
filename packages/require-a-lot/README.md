Makes your object-trees more navigable.
<!--- destination qa rewrite begin -->
### QA monorepo
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CircleCI](https://circleci.com/gh/vidaxl-com/cowlog/tree/master.svg?style=svg)](https://circleci.com/gh/vidaxl-com/cowlog/tree/master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/test_coverage)](https://codeclimate.com/github/vidaxl-com/cowlog/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/maintainability)](https://codeclimate.com/github/vidaxl-com/cowlog/maintainability)
[![Greenkeeper badge](https://badges.greenkeeper.io/vidaxl-com/cowlog.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/vidaxl-com/cowlog/badge.svg?targetFile=packages%2Fdsl-framework%2Fpackage.json)](https://snyk.io/test/github/vidaxl-com/cowlog?targetFile=packages%2Fdsl-framework%2Fpackage.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog?ref=badge_shield)

[![HitCount](http://hits.dwyl.com/vidaxl.com/cowlog.svg)](http://hits.dwyl.com/vidaxl-com/cowlog)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
<!--- destination qa rewrite end -->

[![HitCount](http://hits.dwyl.com/vidaxl.com/cowlog.svg)](http://hits.dwyl.com/vidaxl-com/cowlog)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
<!--- destination qa rewrite end -->

# Installation
```bash
npm install require-a-lot
```
# Motivation
Sometimes it is better to have a different way to load your node modules.

## Examples
basic use:
```javascript 1.8
const requireALot = require('require-a-lot')
const {camelcase, chai, babelCli, testSpec} = 
requireALot(require)('camelcase', 'chai', 'license-checker', './test-spec')()
```
Please remember the closing empty function call at the end.

using aliases:
```javascript 1.8
const {cc, lc, testSpec} = 
requireALot(require)('camelcase', 'license-checker', './test-spec')
    .alias('camelcase', 'cc')
    .alias('license-checker', 'lc')()
```
The returning object will contain only the aliases for the aliased entries.

getting object tag of a library (like expect in chai?)
```javascript 1.8
const {expect} = require('chai') 
```

Instead of the previous you can do:
```javascript 1.8
const {chai, expect} = 
requireALot(require)('chai', 'license-checker', './test-spec')
    .from('chai', 'expect')()
```

Just for the sake of the convinience, maybe you don't want to write the left part of the equation for yourself.
Add the .log chaining call any time and it will console.log it for you if you:
```javascript 1.8
requireALot(require)('chai', 'license-checker', './test-spec').log
    .from('chai', 'expect')()
```

Sometimes you don't need the chai, so you say:
```javascript 1.8
requireALot(require)('chai', 'license-checker', './test-spec').log
    .from('chai', 'expect').hide('chai')()
```
You can call as much time hide as you want to, with as much parameter as you want.

Ahh and one more thing using .info with the log wil result in something like this
```javascript 1.8
requireALot(require)('cowlog','chai').from('chai',['expect']).log.info.alias('cowlog', 'l')()
```
will result in your console like:
```
{
  l, //alias of cowlog | cowlog@1.6.18 (+?) | homepage: https://github.com/vidaxl-com/cowlog/tree/master/packages/cowlog | description: Development time logging for NodeJs
  chai, //chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
  expect, //tag of chai | chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
} = 
```

so it is easy to copy to your code like
```javascript 1.8
const {
  l, //alias of cowlog | cowlog@1.6.18 (+?) | homepage: https://github.com/vidaxl-com/cowlog/tree/master/packages/cowlog | description: Development time logging for NodeJs
  chai, //chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
  expect, //tag of chai | chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
} = requireALot(require)('cowlog','chai').from('chai',['expect']).log.info.alias('cowlog', 'l')()
```

The .info feature is useful if you include the requiring part from an other module like:
```javascript 1.8
const {
  l, //alias of cowlog | cowlog@1.6.18 (+?) | homepage: https://github.com/vidaxl-com/cowlog/tree/master/packages/cowlog | description: Development time logging for NodeJs
  chai, //chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
  expect, //tag of chai | chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
} = require('./your_module')
```
