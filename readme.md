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

const cowlog = require('@vidaxl/cowlog')();
cowlog.log('abcz, 1337, 1.23')`;

```
```
 ____________________________________________________________________________________________________________________
(                                                                                                                    )
( 0 Beginnig -------                                                                                                 )
( "abcz"                                                                                                             )
( 0 End -------                                                                                                      )
(                                                                                                                    )
( 1 Beginnig -------                                                                                                 )
( 1337                                                                                                               )
( 1 End -------                                                                                                      )
(                                                                                                                    )
( 2 Beginnig -------                                                                                                 )
( 1.23                                                                                                               )
( 2 End -------                                                                                                      )
(                                                                                                                    )
( _-_-_-_-_-_-_-_-_-_-_-_                                                                                            )
(                                                                                                                    )
( called from:/pwa/cowlogtest/node_modules/@vidaxl/cowlog/tests/lib/test-runner.js:25:36                             )
( stack trace:/tmp/cowlog/hashes/3a/4af6aeae3b05a6ff2cc65f008705bf9603d7b873780132b2114553097b752d_stack-trace.log   )
( session log:/tmp/cowlog/hashes/bb/9a1a47cf5d03dcccf22a8c8b315c3bb423241698d4189e83b460c8da346d03_session.log       )
( logged at:2017-12-01T15:57:35.154Z                                                                                 )
 --------------------------------------------------------------------------------------------------------------------
  o
   o
       ___  
     {~._.~}
      ( Y )
     ()~*~()   
     (_)-(_)   
```
### Logging a string
```javascript

const cowlog = require('@vidaxl/cowlog')('clean')
cowlog.log('abcz')

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
            \          __---__
                    _-       /--______
               __--( /     \ )XXXXXXXXXXX\v.
             .-XXX(   O   O  )XXXXXXXXXXXXXXX-
            /XXX(       U     )        XXXXXXX\
          /XXXXX(              )--_  XXXXXXXXXXX\
         /XXXXX/ (      O     )   XXXXXX   \XXXXX\
         XXXXX/   /            XXXXXX   \__ \XXXXX
         XXXXXX__/          XXXXXX         \__---->
 ---___  XXX__/          XXXXXX      \__         /
   \-  --__/   ___/\  XXXXXX            /  ___--/=
    \-\    ___/    XXXXXX              '--- XXXXXX
       \-\/XXX\ XXXXXX                      /XXXXX
         \XXXXXXXXX   \                    /XXXXX/
          \XXXXXX      >                 _/XXXXX/
            \XXXXX--__/              __-- XXXX/
             -XXXXXXXX---------------  XXXXXX-
                \XXXXXXXXXXXXXXXXXXXXXXXXXX/
                  ""VXXXXXXXXXXXXXXXXXXV""
```
### Logging n array
```javascript

const cowlog = require('@vidaxl/cowlog')()

cowlog.log([1,2,three])

```
```
 ____________________
/                    \
| 0 Beginnig ------- |
| [                  |
|   1,               |
|   2,               |
|   "three"          |
| ]                  |
| 0 End -------      |
\                    /
 --------------------
       \    ____
        \  /    \
          | ^__^ |
          | (oO) |______
          | (__) |      )\/\
           \____/|----w |
                ||     ||

	         Moofasa
```
### Logging a function
```javascript

const cowlog = require('@vidaxl/cowlog')()
let fuct = function (a, b) {
  return a + b
}
cowlog.log(fuct)


```
```
 ____________________
(                    )
( 0 Beginnig ------- )
( function (a, b) {  )
(   return a + b     )
( }                  )
( 0 End -------      )
(                    )
 --------------------
                      o             ,-----.
                       o            |     |
                        o        ,--|     |-.
                         __,----|  |     | |
                       ,;::     |  `_____' |
                       `._______|    i^i   |
                                `----| |---'| .
                           ,-------._| |== ||//
                           |       |_|P`.  /'/
                           `-------' 'Y Y/'/'
                                     .==\ /_\
   ^__^                             /   /'|  `i
   (oO)\_______                   /'   /  |   |
   (__)\       )\/\             /'    /   |   `i
    U   ||----w |           ___,;`----'.___L_,-'`\__
       ||     ||          i_____;----\.____i""\____\






```

<!--- example end -->
