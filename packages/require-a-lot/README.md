Include your dependencies with elegance.
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
Of course, you can chain .form calls as much as you want.

Just for the sake of the convenience, maybe you don't want to write the left part of the equation for yourself.
Add the .log chaining call any time and it will console.log it for you if you:
```javascript 1.8
const {chai, expect, test-spec,license-checker} = 
requireALot(require)('chai', 'license-checker', './test-spec')
    .log
    .from('chai', 'expect')()

```
You will see in your console:
```
const {chai, expect, test-spec,license-checker} = 

```

So you can easily copy and paste it to your code so just run your code, and copy the console output save some typing for yourself. But this library does much more don't stop here.

Sometimes you don't need the chai, so you say:
```javascript 1.8
const {
    expect, 
    testSpec, 
    licenseChecker, 
 } = 
requireALot(require)('chai', 'license-checker', './test-spec')
    .log
    .from('chai', 'expect').hide('chai')()
```
You will see in your console:
```
const { expect, testSpec, licenseChecker, } = 
```
Of course, you can call as much time .hide as you want to, with as much parameter as you want.

Ahh, and one more thing using .info will give you some decent information about your dependencies required by the library.
If you see it practically it gives you a nice overview of your code. Please don't stop here, it will give you even more.
```javascript 1.8
{
  l, //alias of cowlog | cowlog@1.6.18 (+?) | homepage: https://github.com/vidaxl-com/cowlog/tree/master/packages/cow...
  chai, //chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the ...
  expect //tag of chai | chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for n...
} = 
requireALot(require)('cowlog','chai')
    .from('chai',['expect'])
    .log
    .info
    .alias('cowlog', 'l')()
```
As you can see sometimes it is useful to create aliases from existing libraries, indeed, in this case, the naming is 
really bad, but I keep it like this, so no one will do such crazy thing. But for instance, I like to use the object-path
library. If I use in a file quite often I have used it often, so I just say `.alias('object-path', 'op')` indeed this is
not elegant, but let's face it at least less typing, less space used in the line, and with the .info call it is actually
easy to trace, because, well you see why.

Indeed, you will see in your console:
```
{
  l, //alias of cowlog | cowlog@1.6.18 (+?) | homepage: https://github.com/vidaxl-com/cowlog/tree/master/packages/cowlog | description: Development time logging for NodeJs
  chai, //chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
  expect, //tag of chai | chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
} = 
```

The .info feature is useful if you include the requiring part from the other module like:
```javascript 1.8
const {
  l, //alias of cowlog | cowlog@1.6.18 (+?) | homepage: https://github.com/vidaxl-com/cowlog/tree/master/packages/cowlog | description: Development time logging for NodeJs
  chai, //chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
  expect, //tag of chai | chai@4.2.0 (+?) | homepage: http://chaijs.com | description: BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
} = require('./your_module')
```
so `./your_module` will contain all the require-a-lot magic only like :
```javascript 1.8
module.exports = requireALot(require)('cowlog','chai')
    .from('chai',['expect'])
    .log
    .info
    .alias('cowlog', 'l')()
```
Because it caches the output, because that is just an object you can use it in multiple modules. Please, go on this 
library can do much more for you than this.

To make it useful please use .tag together with the .linkDirectory and indeed in real life put the requireALot line in a 
a separate module like above, in the example I don't do it because of the size of this document, but all the examples from
now on is implemented optimally if it is in a separate module:
```javascript 1.8
const path = require('path')
// [require-a-lot] testIncludes begin
const {
  capture, //reative path: ../lib/capture
  assert, //assert@1.4.1 (+?) | homepage: https://github.com/defunctzombie/commonjs-assert | description: commonjs assert - node.js api compatible
  cowlog, //cowlog@1.6.18 (+?) | homepage: https://github.com/vidaxl-com/cowlog/tree/master/packages/cowlog | description: Development time logging for NodeJs
}  
// [require-a-lot] testIncludes end
 =  requireALot(require)('../lib/capture','assert', 'cowlog')
      .log
      .info
      .tag("testIncludes").linkDirectory(path.join(__dirname))()
```
It adds two extra comment lines for the library, that helps the engine to identify the location of your dependencies
in the code. If you add or remove more it will be updated automatically upon running your application if you think on
it, you can implement in a way that your application will be updated before it evaluates the files where you use the 
library, so every time your application get the dependencies are defined in the library. 
The best feature is ahead, keep reading :D

```javascript 1.8
const path = require('path')
// [require-a-lot] testIncludes begin
const {
  assert, //assert@1.4.1 (+?) | homepage: https://github.com/defunctzombie/commonjs-assert | description: commonjs assert - node.js api compatible
}  
// [require-a-lot] testIncludes end
 =  requireALot(require)('../lib/capture','assert', 'cowlog')
      // .log
      .info
      .tag("testIncludes").linkDirectory(path.join(__dirname))
      .removeUnused
      ()
      
      assert(1 === 1)
```

As you see above the .removeUnused utilizes the esprima javascript parser and tries to find out what dependencies you 
actually, use and removes the ones that you don't refer to in the actual module. This is not over yet! 

There is one more thig!

Actually I made it a lazy evaluation dependency injection container too. I only needed to add the .compose 
chain function to the already existing dsl.

```javascript 1.8
const path = require('path')
// [require-a-lot] testIncludes begin
const {
  sayHelloToName,
}  
// [require-a-lot] testIncludes end
 =  requireALot(require)('assert', 'cowlog')
      // .log
      .compose('logger', cowlog=>cowlog().log, 'cowlog')
      .compose('sayHelloToName', (logger)=>(name)=>logger(`hello ${name}`)(), 'logger')
      .compose('somethingComplex', (logger, sayHelloToName, assert)=>(name, success=true)=>{
        sayHelloToName(name)
        try {
          assert(success)
        } catch (e) {
          logger (name, "unfortunately not success")()
        }
    
        return({name, success})
      }, ['logger', 'sayHelloToName', 'assert'])
      .info
      .tag("testIncludes").linkDirectory(path.join(__dirname))
      .removeUnused
      ()
      
      somethingComplex('Justin', true)
```
More features are coming...
