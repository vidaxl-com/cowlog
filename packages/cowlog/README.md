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

Cowlog is **not for production code**, as it might cause performance issues. However, the tool provides **detailed information** about **where from you called** it from, so **you can locate and remove after debugging**. It gives you the **stack trace**. All the **log** messages **per process** to a separate file and **many more** things.
<!--- source chat rewrite begin -->
### Chat
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/cowlog/Lobby)
<!--- source chat rewrite end -->
# Cowlog


Cowlog is made for developers by the vidaxl.com, helping them and you to debug with less effort. It is a library that helps you identify your debug message quickly
on the **console output**. The project supports the
**NodeJs environment** so far as these days browsers provide neat standard
toolsets for debugging your applications.

We want cowlog to be usable in any circumstances without problems therefore we
have close **100% code coverage**, but at least 90%.


## Motivation

- Server-side applications tend to pollute the console still sometimes you want
to use console.log, and not solely use the amazing debug mode
[--inspect](https://nodejs.org/en/docs/inspector/)
of the node.js.

- CowLog can help you refactor your code faster. Our aim is that the code would run on every node.js environment >= 4.0.0 
but for now, it supports only ES6 environments.

## Installation
```bash
npm install cowlog --save-dev
```

## Usage
For [more documentation click here](https://github.com/vidaxl-com/cowlog/blob/master/packages/cowlog/documentation/logging_functionality.md).
That document will leverage the power of the logging capabilities of this
library.

<!--- example begin -->
### Chances are hight, "that's the way you like it..."
You will see all information with cowlog, no need to have
specially trained eye for development log messages, or particular identifiable
strings, before and after you want to look at.

- **session log**: Every you call cowlog, the results appear in a
separate file. 

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
                    1, 1, 3, 7],
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
 _______________________________________________________________________________________
/ 0 Beginnig -------                                                                    \
| "abcz"                                                                                |
| 0 End -------                                                                         |
| 1 Beginnig -------                                                                    |
| {                                                                                     |
|   a: "A",                                                                             |
|   "embeded.level1.level2.c": null,                                                    |
|   "embeded.level1.level2.c2": "cc",                                                   |
|   "embeded.level1.level2.array.0.a": "a",                                             |
|   "embeded.level1.level2.array.0.b": "b",                                             |
|   "embeded.level1.level2.array.1": 1,                                                 |
|   "embeded.level1.level2.array.2": 1,                                                 |
|   "embeded.level1.level2.array.3": 3,                                                 |
|   "embeded.level1.level2.array.4": 7,                                                 |
|   "embeded.level1.level2.testObject2.c": 1,                                           |
|   "embeded.level1.level2.testObject2.fn": function (a, b) {                           |
|   return a + b                                                                        |
| },                                                                                    |
|   "embeded.level1.b": "1.5"                                                           |
| }                                                                                     |
| 1 End -------                                                                         |
| 2 Beginnig -------                                                                    |
| "This is a very long text. Indeed, it has to be long enough to be able to             |
| present how awesomely it breaks the strings so that you will have a conven            |
| ient reading experience through your logs."                                           |
| 2 End -------                                                                         |
| _-_-_-_-_-_-_-_-_-_-_-_                                                               |
|                                                                                       |
| called from:/home/it/dev/misc/cowlog/packages/cowlog/tests/lib/test-runner.js:25:36   |
| stack trace:/tmp/cowlog/hashes/cc/22cd81245f410caa812da8c1f38657_stack-trace.log      |
| session log:/tmp/cowlog/hashes/20/5049360acc66d9ef8fe309a6586125_session.log          |
\ logged at:2018-06-11T12:49:56.529Z                                                    /
 ---------------------------------------------------------------------------------------
  \
   \
      /\_)o<
     |      \
     | O . O|
      \_____/

```

<!--- example end -->

### Remarks

If you don't have a global variable registered to l (cowlog.log) or of
(cowlog.lf) than cowlog will register them, so you can reach it from anywhere.
I know it is against all good practice, but don't forget to remove it after you 
finished your development session. In the future, we will 
add a production feature to the software, but that needs 
some pressure from the community, and meanwhile, we have 
more meaningful things to implement.

<!--- source part of cowlog begin -->
This document is part of the [Cowlog](https://github.com/vidaxl-com/cowlog) project.
<!--- source part of cowlog end -->
