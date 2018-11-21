<!--- destination qa rewrite begin -->

### QA monorepo
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CircleCI](https://circleci.com/gh/vidaxl-com/cowlog/tree/master.svg?style=svg)](https://circleci.com/gh/vidaxl-com/cowlog/tree/master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/test_coverage)](https://codeclimate.com/github/vidaxl-com/cowlog/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/maintainability)](https://codeclimate.com/github/vidaxl-com/cowlog/maintainability)
[![Greenkeeper badge](https://badges.greenkeeper.io/vidaxl-com/cowlog.svg)](https://greenkeeper.io/)


[![Known Vulnerabilities](https://snyk.io/test/github/vidaxl-com/cowlog/badge.svg?targetFile=packages%2Fdsl-framework%2Fpackage.json)](https://snyk.io/test/github/vidaxl-com/cowlog?targetFile=packages%2Fdsl-framework%2Fpackage.json)
[![HitCount](http://hits.dwyl.com/vidaxl.com/cowlog.svg)](http://hits.dwyl.com/{username}/{project-name})
<!---
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog?ref=badge_shield)
-->
<!--- destination qa rewrite end -->

# Installation
```bash
npm install dsl-framework --save
```

# Motivation
I wanted to have a small unlimited currying solution for functional programming techniques
so that I can develop domain-specific languages easily and keep its application close to the code,
Moreover, use it for different kind of tasks. I started
educating myself to LISP and tying to transpiring back to my daily work life some practical concept,
using data as code and creating small domain specific languages, this is an attempt for that.

I wrote **[cowlog](https://github.com/vidaxl-com/cowlog/tree/master/packages/cowlog)** and the central point of the application
is the usage of its specific small DSL trough chained function calls. The code that creates this possibility was
complex and precise, really too hard to understand, maintain develop and refactor; entirely the worst kind. The idea
was if we extract this necessarily complex monster into and external reusable library.

# Usage
I present the usage of the library with the example below; there are many ways to use it, let's start with the most
practically applicable one.

## Example sync basic

In this example, you can see the library if you do callback needs to have two of them the first receives the error code
that is 0 at the moment only, in the future it will change and the second that is all the parameters you chained trough.

```javascript 1.8
const unlimitedCurry = require('dsl-framework')
const fn = unlimitedCurry(
  (e, parameters) => {
    //will not return anything, will be execited anyways
  },
    parameters=>`${parameters.data.returnArray[0]}${parameters.data.returnArray[1]}${parameters.data.returnArray[2]}`
  )
const returnValue = await fn('a')('b')('c')()
console.log(returnValue)
expect(returnValue).to.be.equal('abc')
```

## Example async basic
As you see this example looks just a bit different, but his small difference not calling the empty parenthesis makes the first callbacks execution async as well.
Technically it is a setTimeout(()=>{}, 0) you can google it, that was enlightening for me, maybe you would enjoy that doing so. Later in this documentation, for now, please consult the source.
Maybe **[this](https://www.youtube.com/watch?v=8aGhZQkoFbQ) video** will help as well.

```javascript 1.8
const unlimitedCurry = require('dsl-framework')

const fn = unlimitedCurry(
  (e, parameters) => {
    return parameters.data.returnArray[0]
      + parameters.data.returnArray[1]
      + parameters.data.returnArray[2]
  })
const returnValue = await fn('a')('b')('c').p().then(data=>data)
console.log(returnValue)
expect(returnValue).to.be.equal('abc')

```
If you don't use the promise the `p()` function, as it is a detached execution you will not be able to get back anything.

## split call example

This few lines also comes from the test suite, but you will get how you can use it in real life.
```javascript 1.8
const getMyCurry = () => unlimitedCurry(
  (e, parameters) => {
  },
  parameters=>parameters.data.returnArray[0]
    + parameters.data.returnArray[1]
    + parameters.data.returnArray[2]
)
let fn = getMyCurry()
fn('a')
let returnValue = fn('b', 'c')()
expect(returnValue).to.be.equal('abc')

fn = getMyCurry()
fn('a', 'b')
returnValue =  fn('c')()
expect(returnValue).to.be.equal('abc')

fn = getMyCurry()
fn('a')
fn('b')
returnValue = fn('c')()
expect(returnValue).to.be.equal('abc')
```

of course it will work with the promis version too.
