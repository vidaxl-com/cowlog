[![Tests](https://circleci.com/bb/tothimre/cowlog/tree/di_and_tests.svg?style=shield)](https://circleci.com/bb/tothimre/cowlog)
[![Test Coverage](https://api.codeclimate.com/v1/badges/54dfbe1f8c279d36c6db/test_coverage)](https://codeclimate.com/github/tothimre/cowlog/test_coverage)
[![bitHound Overall Score](https://www.bithound.io/bitbucket/tothimre/cowlog/badges/score.svg)](https://www.bithound.io/bitbucket/tothimre/cowlog)
[![bitHound Dependencies](https://www.bithound.io/bitbucket/tothimre/cowlog/badges/dependencies.svg)](https://www.bithound.io/bitbucket/tothimre/cowlog/di_and_tests/dependencies/npm)
[![Maintainability](https://api.codeclimate.com/v1/badges/54dfbe1f8c279d36c6db/maintainability)](https://codeclimate.com/github/tothimre/cowlog/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/tothimre/cowlog/badge.svg)](https://snyk.io/test/github/tothimre/cowlog)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Ftothimre%2Fcowsay.svg?type=small)](https://app.fossa.io/projects/git%2Bgithub.com%2Ftothimre%2Fcowsay?ref=badge_small)

# Cowlog

A library that helps you identify your debug message quickly on the console output. 
The project is meant to be used solely in a nodejs environment unless there will e a usecase to use it in the browser 
as well.

## Motivation

- Recently I have worked quite a lot with backend javascript code, if you want to write maintainable code you have to 
split it to smaller chunks, in practice it means a lot of parameters for your functions and it is really nice what was
passed as parameters. 

- Server side applications tend to pollute the console still sometimes you want to use console.log, and not solely use 
the amazing debug mode of the node.js But it is HARD to spot out your debug messages, of course there are tricks to work 
wiht it, with CowLog it will be obvious.

- CowLog can help you refactoring your code faster. it runs on every node.js environment >= 4.0.0

## Installation
In case the npm.vidaxl.com is not accessible (as it is now) go to the `mode_modules` directory
create the `@vidaxl` directory within this new directory `git clone ssh://git@192.168.11.226:7999/npmlib/cowlog.git`
then `cd cowlog;` after `npm install`.

According to the examples, you can use it.

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
