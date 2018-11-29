
An array focused DSL
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
npm install array-dsl --save
```

# Motivation
This is project helps you to deal with arrays in a more functional/DLS way. This is also a presentation about how easy is to craft your own dsl with the help of the
**[dsl-framework](https://github.com/vidaxl-com/cowlog/tree/master/packages/dsl-framework)**
# Usage
I present the usage of the library with the example below; there are many ways to use it, let's start with the most
practically applicable one.

## Examples

```javascript 1.8
const example = [1,3,2,[4],[5,[6],6]]
const arrayDsl = require('array-dsl')

let result = arrayDsl(example).flatten()
// [1,3,2,4,5,6,6]

result = arrayDsl(example).flatten.unique()
// [1,3,2,4,5,6]

result = arrayDsl(example).flatten.unique.sort()
// [1,2,3,4,5,6]

result = arrayDsl(example).flatten.unique..xor([1,7]).sort()
// [2,3,4,5,6,7]

result = arrayDsl(example).flatten.unique..xor([1,7]).sort.reverse()
// [7,6,5,4,3,2]

result = arrayDsl(example).flatten.unique..xor([1,7]).sort().slice(1)()
// [3,4,5,6,7]

let randonItem = result = arrayDsl(example).flatten.unique..xor([1,7]).sort().slice(1).randomItem()

randonItem()
// this could return an item from the array [3,4,5,6,7]
// you can call it as much as you want

result = arrayDsl(example).flatten.unique..xor([1,7]).sort().slice(1).union([1,8,2,3])()
// [1,2,3,4,5,6,7,8]

result = arrayDsl([1,1,1,2,3,4,5]).union([1,8,2,3])()
// [1,2,3,4,5,8]

const rlastComplex = arrayDsl([1,1,1,2,3,4,5]).union([1,8,2,3]).last()
// 8
const first  = arrayDsl([1,2,3]).first()
// 1
const flast  = arrayDsl([1,2,3]).last()
// 3

```
