[![CircleCI](https://circleci.com/gh/vidaxl-com/cowlog/tree/master.svg?style=svg)](https://circleci.com/gh/vidaxl-com/cowlog/tree/master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/test_coverage)](https://codeclimate.com/github/vidaxl-com/cowlog/test_coverage)
[![bitHound Overall Score](https://www.bithound.io/github/vidaxl-com/cowlog/badges/score.svg)](https://www.bithound.io/github/vidaxl-com/cowlog)
[![bitHound Dependencies](https://www.bithound.io/github/vidaxl-com/cowlog/badges/dependencies.svg)](https://www.bithound.io/github/vidaxl-com/cowlog/master/dependencies/npm)
[![Maintainability](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/maintainability)](https://codeclimate.com/github/vidaxl-com/cowlog/maintainability)[![Known Vulnerabilities](https://snyk.io/test/github/tothimre/cowlog/badge.svg)](https://snyk.io/test/github/tothimre/cowlog)
[![Known Vulnerabilities](https://snyk.io/test/github/vidaxl-com/cowlog/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vidaxl-com/cowlog?targetFile=package.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog?ref=badge_shield)
[![Greenkeeper badge](https://badges.greenkeeper.io/vidaxl-com/cowlog.svg)](https://greenkeeper.io/)

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
### Default logging
```javascript

const cowlog = require('@vidaxl/cowlog')()
cowlog.log('abcz, 1337, 1.23');

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
( called from:/home/it/dev/cowlog/tests/lib/test-runner.js:24:36                                                     )
( stack trace:/tmp/cowlog/hashes/74/1ebcc910e352a95690c64dfa43758ed44783a24c946a94da31bab4d537f58d_stack-trace.log   )
( session log:/tmp/cowlog/hashes/2b/72a7383e0d885161411397519315470b5459a1921215e6f752ca69141d962f_session.log       )
( logged at:2018-02-04T00:13:15.298Z                                                                                 )
 --------------------------------------------------------------------------------------------------------------------
     o
      o
          oO)-.                       .-(Oo
         /__  _\                     /_  __\
         \  \(  |     ()~()         |  )/  /
          \__|\ |    (-___-)        | /|__/
          '  '--'    ==`-'==        '--'  '
```
### logging with the "clean" plugin
```javascript

const cowlog = require('@vidaxl/cowlog')('clean')
cowlog.log('abcz')

```
```
 ____________________
(                    )
( 0 Beginnig ------- )
( "abcz"             )
( 0 End -------      )
(                    )
 --------------------
          o      (__)      
           o     /oO|  
            o   (_"_)*+++++++++*
                   //I#\\\\\\\\I\
                   I[I|I|||||I I `
                   I`I'///'' I I
                   I I       I I
                   ~ ~       ~ ~
                     Scowleton
```
### Logging an array
```javascript

const cowlog = require('@vidaxl/cowlog')()
cowlog.log([1,2,three])

```
```
 ____________________
(                    )
( 0 Beginnig ------- )
( [                  )
(   1,               )
(   2,               )
(   "three"          )
( ]                  )
( 0 End -------      )
(                    )
 --------------------
          o
           o
            o          __---__
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
### Logging a function
```javascript

const cowlog = require('@vidaxl/cowlog')()
let fuct = function (a, b) {
  return a + b
}
cowlog.logf(fuct)


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
  o
   o ,   _ ___.--'''`--''//-,-_--_.
      \`"' ` || \\ \ \\/ / // / ,-\\`,_
     /'`  \ \ || Y  | \|/ / // / - |__ `-,
    /@"\  ` \ `\ |  | ||/ // | \/  \  `-._`-,_.,
   /  _.-. `.-\,___/\ _/|_/_\_\/|_/ |     `-._._)
   `-'``/  /  |  // \__/\__  /  \__/ \
        `-'  /-\/  | -|   \__ \   |-' |
          __/\ / _/ \/ __,-'   ) ,' _|'
         (((__/(((_.' ((___..-'((__,'
```

<!--- example end -->
