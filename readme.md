[![Tests](https://circleci.com/bb/tothimre/cowlog/tree/di_and_tests.svg?style=shield)](https://circleci.com/bb/tothimre/cowlog)
[![Test Coverage](https://api.codeclimate.com/v1/badges/54dfbe1f8c279d36c6db/test_coverage)](https://codeclimate.com/github/tothimre/cowlog/test_coverage)
[![bitHound Overall Score](https://www.bithound.io/bitbucket/tothimre/cowlog/badges/score.svg)](https://www.bithound.io/bitbucket/tothimre/cowlog)
[![bitHound Dependencies](https://www.bithound.io/bitbucket/tothimre/cowlog/badges/dependencies.svg)](https://www.bithound.io/bitbucket/tothimre/cowlog/di_and_tests/dependencies/npm)
[![Maintainability](https://api.codeclimate.com/v1/badges/54dfbe1f8c279d36c6db/maintainability)](https://codeclimate.com/github/tothimre/cowlog/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/tothimre/cowlog/badge.svg)](https://snyk.io/test/github/tothimre/cowlog)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftothimre%2Fcowsay.svg?type=small)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftothimre%2Fcowsay?ref=badge_small)
[![Greenkeeper badge](https://badges.greenkeeper.io/tothimre/cowlog.svg)](https://greenkeeper.io/)

# Cowlog

Cowlog is made for developers, helping them to get relevant information about the state of the application, in other terms debugging their application. At the moment it provides you a flexible logging tool. It is easy to add cowlog to your project.

## Installation
```bash
git clone git@github.com:tothimre/cowlog.git node_modules/@vidaxl/cowlog
cd node_modules/@vidaxl/cowlog && npm install && cd ../../../
```
It is not added to your dependencies, but you can use the tool like swiss knife at tricky situations.

A library that helps you identify your debug message quickly on the console output. 
The project is meant to be used solely in a nodejs environment as theese days browsers provide standard toolsets for debuging your applications.

## Motivation

- Server side applications tend to pollute the console still sometimes you want to use console.log, and not solely use 
the amazing debug mode of the node.js But it is HARD to spot out your debug messages, with th usage of CowLog it will be obvious.

- CowLog can help you refactoring your code faster. it runs on every node.js environment >= 4.0.0

## Usage

<!--- example begin -->
### Logging a string
```javascript

const cowlog = require("@vidaxl/cowlog")()`;

cowlog.log('abcz, 1337, 1.23')`;

```
```
 ____________________________________________________________________________________________________________________
/                                                                                                                    \
| 0 Beginnig -------                                                                                                 |
| "abcz"                                                                                                             |
| 0 End -------                                                                                                      |
|                                                                                                                    |
| 1 Beginnig -------                                                                                                 |
| 1337                                                                                                               |
| 1 End -------                                                                                                      |
|                                                                                                                    |
| 2 Beginnig -------                                                                                                 |
| 1.23                                                                                                               |
| 2 End -------                                                                                                      |
|                                                                                                                    |
| _-_-_-_-_-_-_-_-_-_-_-_                                                                                            |
|                                                                                                                    |
| called from:/pwa/cowlogtest/node_modules/@vidaxl/cowlog/tests/lib/test-runner.js:25:36                             |
| stack trace:/tmp/cowlog/hashes/7c/8c59df81edcda5df00181af6f4c06b2cb35ce9fbaab8297149247caf7c260f_stack-trace.log   |
| session log:/tmp/cowlog/hashes/0d/5922440fe880000f1cd65e46e8ffbb11ff511e231d30c726dc1335108db7bc_session.log       |
\ logged at:2017-11-28T18:48:32.772Z                                                                                 /
 --------------------------------------------------------------------------------------------------------------------
   \
    \              ....       
           ........    .      
          .            .      
         .             .      
.........              .......
..............................

Elephant inside ASCII snake
```
### Logging a string
```javascript

const cowlog = require("@vidaxl/cowlog")('clean)`;

cowlog.log('abcz')`;

```
```
 ____________________
/                    \
| 0 Beginnig ------- |
| "abcz"             |
| 0 End -------      |
\                    /
 --------------------
     \
      \
       ("`-'  '-/") .___..--' ' "`-._
         ` *_ *  )    `-.   (      ) .`-.__. `)
         (_Y_.) ' ._   )   `._` ;  `` -. .-'
      _.. `--'_..-_/   /--' _ .' ,4
   ( i l ),-''  ( l i),'  ( ( ! .-'    
```

<!--- example end -->
