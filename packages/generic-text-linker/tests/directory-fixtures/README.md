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

**Cowlog is not meant to be included in any production code, as it might create
performance issues.** 
However, the tool provides you the ability to see where it is used in your code,
so it can safely and easily removed. Cowlog let you see the **stacktrace** up until
where from this tool called. **All the log messages** per process are
**collected to a separate file**.
<!--- source chat rewrite begin -->
### Chat
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/cowlog/Lobby)
<!--- source chat rewrite end -->
# Cowlog

Cowlog is made for developers by the vidaxl.com, helping them to debug their
application. It is a library that helps you identify your debug message quickly
on the console output. The project is meant to be used solely in a
**nodejs environment** as these days browsers provide really neat standard
toolsets for debugging your applications.

We want cowlog to be usable in any circumstances without problems therfore we
have 100% code coverage.


## Motivation

- Server side applications tend to pollute the console still sometimes you want
to use console.log, and not solely use the amazing debug mode
[--inspect](https://nodejs.org/en/docs/inspector/)
of the node.js.

- CowLog can help you refactoring your code faster. it runs on every node.js
environment >= 4.0.0

## Installation
```bash
npm install cowlog --save-dev
```

## Usage
For [more documentation click here](./documentation/logging_functionality.md)
this document will leverage the power of the logging capabilities of this
library.

<!--- example begin -->
### That's the way you like it
You will see all information with cowlog, no need to have
specially trained eye for development log messages, or particular identifiable
strings, before and after you want to look at.

- **session log**: Every time cowlog is called, the result is logged in a
separate file. That way, all the recors can be found through the path displayed
and get inspected even when the code is running in real time.

- **called from**: It is the exact place where you placed cowlog, so you can
remove it with ease, after you have inspected the variables in the
runtime.

The "stack trace" will help you, it sticks with cowlog.

### Default logging

```javascript

const cowlog = require('cowlog')()

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
const longString = 'This is a .* logs.' // you got it!

cowlog.log('abcz', embededObject, longString);

```


```
 ____________________________________________________________________________________________________________________
/ 0 Beginnig -------                                                                                                 \
| "abcz"                                                                                                             |
| 0 End -------                                                                                                      |
| 1 Beginnig -------                                                                                                 |
| {                                                                                                                  |
|   a: "A",                                                                                                          |
|   "embeded.level1.level2.c": null,                                                                                 |
|   "embeded.level1.level2.c2": "cc",                                                                                |
|   "embeded.level1.level2.array.0.a": "a",                                                                          |
|   "embeded.level1.level2.array.0.b": "b",                                                                          |
|   "embeded.level1.level2.array.1": 1,                                                                              |
|   "embeded.level1.level2.array.2": 1,                                                                              |
|   "embeded.level1.level2.array.3": 3,                                                                              |
|   "embeded.level1.level2.array.4": 7,                                                                              |
|   "embeded.level1.level2.testObject2.c": 1,                                                                        |
|   "embeded.level1.level2.testObject2.fn": function (a, b) {                                                        |
|   return a + b                                                                                                     |
| },                                                                                                                 |
|   "embeded.level1.b": "1.5"                                                                                        |
| }                                                                                                                  |
| 1 End -------                                                                                                      |
| 2 Beginnig -------                                                                                                 |
| "This is a very long text, indeed, it has to be logn enough to be able to                                          |
| present how awesomely it breaks the strings, so you will have a convinient                                         |
|  reading expreience trough your logs."                                                                             |
| 2 End -------                                                                                                      |
| _-_-_-_-_-_-_-_-_-_-_-_                                                                                            |
|                                                                                                         |
| called from:/home/it/dev/misc/cowlog/packages/cowlog/tests/lib/test-runner.js:25:36 [0m [0m                              |
| stack trace:/tmp/cowlog/hashes/83/df9210502c9fa8ac6128e33fd68f3e247f2bf0b04011612b870e9b8eeb3c00_stack-trace.log [0m [0m |
| session log:/tmp/cowlog/hashes/2a/aee0e04a8f828ab8fa0fce31f2df9b8ca5024f86d25352fa437e53b95bb907_session.log [0m [0m     |
\ logged at:2018-04-13T19:48:09.094Z                                                                                 /
 --------------------------------------------------------------------------------------------------------------------
  \     .    _  .    
   \    |\_|/__/|    
       / / \/ \  \  
      /__|O||O|__ \
     |/_ \_/\_/ _\ |  
     | | (____) | ||  
     \/\___/\__/  //
     (_/         ||
      |          ||
      |          ||\   
       \        //_/  
        \______//
       __ || __||
      (____(____)

```

<!--- example end -->

### Remarks

If you don't have a golbal variable registered to l (cowlog.log) or lf
(cowlog.lf) than cowlog will register them, so you can reach it from anywhere.
I know it is against all good practice, but don't forget cowlog is used in
developmnet time only.

<!--- source part of cowlog begin -->
This document is part of the [Cowlog](https://github.com/vidaxl-com/cowlog) project.
<!--- source part of cowlog end -->
