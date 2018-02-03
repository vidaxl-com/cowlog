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
### Default logging
```javascript

const cowlog = require('@vidaxl/cowlog')()
cowlog.log('abcz, 1337, 1.23');

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
| called from:/pwa/cowlogtest/node_modules/@vidaxl/cowlog/tests/lib/test-runner.js:24:36                             |
| stack trace:/tmp/cowlog/hashes/96/2297087d08aec6fdf531585a634791c9a1cd89a9fb28a6c328f74e5c8d9e49_stack-trace.log   |
| session log:/tmp/cowlog/hashes/b6/154cf5cd11456fdf382fde5326eba99c83abbaaffb6ba6091a11d632087a58_session.log       |
\ logged at:2017-12-01T16:48:38.706Z                                                                                 /
 --------------------------------------------------------------------------------------------------------------------
   \
    \
        .--.
       |o_o |
       |:_/ |
      //   \ \
     (|     | )
    /'\_   _/`\
    \___)=(___/

```
### logging with the "clean" plugin
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
          \           \  / 
           \           \/  
               (__)    /\         
               (oO)   O  O        
               _\/_   //         
         *    (    ) //       
          \  (\\    //       
           \(  \\    )                              
            (   \\   )   /\                          
  ___[\______/^^^^^^^\__/) o-)__                     
 |\__[=======______//________)__\                    
 \|_______________//____________|                    
     |||      || //||     |||
     |||      || @.||     |||                        
      ||      \/  .\/      ||                        
                 . .                                 
                '.'.`                                

            COW-OPERATION                           
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
    o        .
     .---.  //
    Y|o o|Y// 
   /_(i=i)K/ 
   ~()~*~()~  
    (_)-(_)   

     Darth 
     Vader    
     koala        
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
     o
      o
  ___       _____     ___
 /   \     /    /|   /   \
|     |   /    / |  |     |
|     |  /____/  |  |     |     
|     |  |    |  |  |     |
|     |  | {} | /   |     |
|     |  |____|/    |     |
|     |    |==|     |     |
|      \___________/      |
|                         |
|                         |
```

<!--- example end -->
