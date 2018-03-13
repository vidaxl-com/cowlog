<!--- source readme begin -->
<!--- source qa rewrite begin -->
### QA
[![CircleCI](https://circleci.com/gh/vidaxl-com/cowlog/tree/master.svg?style=svg)](https://circleci.com/gh/vidaxl-com/cowlog/tree/master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/test_coverage)](https://codeclimate.com/github/vidaxl-com/cowlog/test_coverage)
[![bitHound Overall Score](https://www.bithound.io/github/vidaxl-com/cowlog/badges/score.svg)](https://www.bithound.io/github/vidaxl-com/cowlog)
[![bitHound Dependencies](https://www.bithound.io/github/vidaxl-com/cowlog/badges/dependencies.svg)](https://www.bithound.io/github/vidaxl-com/cowlog/master/dependencies/npm)
[![Maintainability](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/maintainability)](https://codeclimate.com/github/vidaxl-com/cowlog/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/vidaxl-com/cowlog/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vidaxl-com/cowlog?targetFile=package.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog?ref=badge_shield)
[![Greenkeeper badge](https://badges.greenkeeper.io/vidaxl-com/cowlog.svg)](https://greenkeeper.io/)
<!--- source qa rewrite end -->

<!--- source chat rewrite begin -->
### Chat
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/cowlog/Lobby)
<!--- source chat rewrite end -->
# Cowlog

Cowlog is made for developers by the vidaxl.com, helping them to debug their
application. It is a library that helps you identify your debug message quickly
on the console output. The project is meant to be used solely in a
**nodejs environment** as these days browsers provide really neat standard toolsets for debugging your
applications.

We want cowlog to be usable in any circumstances without problems therfore we
have 100% code coverage.

Cowlog is not meant to be included in any production code, as it might create
performance issues. However, the tool provides the ability to see where it is
being used in your code, so it can safely and easily removed (see the first
example).

## Why use it?

- Server side applications tend to pollute the console still sometimes you want
to use console.log, and not solely use the amazing debug mode [--inspect](https://nodejs.org/en/docs/inspector/)
of the node.js.

- CowLog can help you refactoring your code faster. it runs on every node.js
environment >= 4.0.0

## Installation
```bash
npm install cowlog --save-dev
```

## Usage
For [more documentation click here](documentation/logging_functionality.md) this
document will leverage the power of the logging capabilities of this library.

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
cowlog.log('abcz, 1337, 1.23');

```


```
 ____________________________________________________________________________________________________________________
/                                                                                                                    \
| [7m0 Beginnig -------[27m                                                                                                 |
| "abcz"                                                                                                             |
| [7m0 End -------[27m                                                                                                      |
|                                                                                                                    |
| [7m1 Beginnig -------[27m                                                                                                 |
| 1337                                                                                                               |
| [7m1 End -------[27m                                                                                                      |
|                                                                                                                    |
| [7m2 Beginnig -------[27m                                                                                                 |
| 1.23                                                                                                               |
| [7m2 End -------[27m                                                                                                      |
|                                                                                                                    |
| _-_-_-_-_-_-_-_-_-_-_-_                                                                                            |
| [0m [0m[7m                                                                                                                  |
| called from:[27m[0m[0m/home/it/dev/cowlog/packages/cowlog/tests/lib/test-runner.js:22:36 [0m [0m[7m                                   |
| stack trace:[27m[0m[0m/tmp/cowlog/hashes/97/e5096c6f97d4db890f8c17c0755791ce05d6713de4aa3eecd71755c40d6f29_stack-trace.log [0m [0m[7m |
| session log:[27m[0m[0m/tmp/cowlog/hashes/27/b4765c805c18d4799d1a00fae9ac05ffea25e07fbcf2e3c7f188a5135470b6_session.log [0m [0m[7m     |
\ logged at:[27m[0m[0m2018-03-13T13:11:58.068Z                                                                                 /
 --------------------------------------------------------------------------------------------------------------------
          \      (__)      
           \     /oO|  
            \   (_"_)*+++++++++*
                   //I#\\\\\\\\I\
                   I[I|I|||||I I `
                   I`I'///'' I I
                   I I       I I
                   ~ ~       ~ ~
                     Scowleton[object Object]

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
<!--- source readme end -->
