### QA
[![CircleCI](https://circleci.com/gh/vidaxl-com/cowlog/tree/master.svg?style=svg)](https://circleci.com/gh/vidaxl-com/cowlog/tree/master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/test_coverage)](https://codeclimate.com/github/vidaxl-com/cowlog/test_coverage)
[![bitHound Overall Score](https://www.bithound.io/github/vidaxl-com/cowlog/badges/score.svg)](https://www.bithound.io/github/vidaxl-com/cowlog)
[![bitHound Dependencies](https://www.bithound.io/github/vidaxl-com/cowlog/badges/dependencies.svg)](https://www.bithound.io/github/vidaxl-com/cowlog/master/dependencies/npm)
[![Maintainability](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/maintainability)](https://codeclimate.com/github/vidaxl-com/cowlog/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/vidaxl-com/cowlog/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vidaxl-com/cowlog?targetFile=package.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog?ref=badge_shield)
[![Greenkeeper badge](https://badges.greenkeeper.io/vidaxl-com/cowlog.svg)](https://greenkeeper.io/)

### Chat
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/cowlog/Lobby)

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

# Usage

<!--- example begin -->
## That's the way you like it
You will see all information with cowlog, no need to have specially
trained eye for development log messages, or special identifiable 
strings, before and after you want to see. You can find what you 
wanted to inspect, if it is too much, or want to preseve it, just put
the path of the file "session log" and you will get all log messages
while the program was running, for later inspection.

"called from" is the exact place where you placed cowlog, so you can 
remove it with ease, after you was inspecting the variables in the 
runtime.

The "stack trace" will help you, it sticks with cowlog.
           
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
( called from:/home/it/dev/cowlog/tests/lib/test-runner.js:23:36                                                     )
( stack trace:/tmp/cowlog/hashes/f4/3eb9e7134e12d86b0f2428f711da165aabab1497840783649c68818802779d_stack-trace.log   )
( session log:/tmp/cowlog/hashes/fe/e2aad4d36cb295bee2835b2e5dbbddfbcb69f0d90be0aca3517040886023cb_session.log       )
( logged at:2018-02-14T23:27:39.454Z                                                                                 )
 --------------------------------------------------------------------------------------------------------------------
   o
    o        .
     .---.  //
    Y|o o|Y// 
   /_(i=i)K/ 
   ~()~*~()~  
    (_)-(_)   

     Darth 
     Vader    
     koala        [object Object]

```
## Plugin system, configuration management
cowlog sopports you with a lot of information, so you always see 
    where form you was logging, but you can turn the details off by initializing 
    cowlog with the "clean" configuration. The details at the bottom are just 
    a product of a plugin that you can disable with ease. For the rest of the 
    examples let's turn them off, so we will have to scroll a bit less.
    
### logging with the "clean" configuration
Only use it if you have good reason like I have at the moment, because you 
    will loose many interesting details and it is all about the details.

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
   \   \
        \ /\
        ( )
      .( o ).[object Object]

```
## More fancy data
Our decsision is to show it all always for you, so you can have more 
educated opinion on the state of affairs within you application
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
   o ,   _ ___.--'''`--''//-,-_--_.
      \`"' ` || \\ \ \\/ / // / ,-\\`,_
     /'`  \ \ || Y  | \|/ / // / - |__ `-,
    /@"\  ` \ `\ |  | ||/ // | \/  \  `-._`-,_.,
   /  _.-. `.-\,___/\ _/|_/_\_\/|_/ |     `-._._)
   `-'``/  /  |  // \__/\__  /  \__/ \
        `-'  /-\/  | -|   \__ \   |-' |
          __/\ / _/ \/ __,-'   ) ,' _|'
         (((__/(((_.' ((___..-'((__,'[object Object]

```
### Logging a function
You will see the functions without calling the toSting() function 
nothing extraordinary, but if you dont't have to type you can focus on more 
meaningful stuff.


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
          o           \  / 
           o           \/  
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

            COW-OPERATION                           [object Object]

```
### Logging an object
Objects are show in full depth.

```javascript

const cowlog = require('@vidaxl/cowlog')()
let fuct = function (a, b) {
  return a + b
}
cowlog.logf(abcz, 1337, 1,2,three, [object Object])

```


```
 _________________________
(                         )
( 0 Beginnig -------      )
( "abcz"                  )
( 0 End -------           )
(                         )
( 1 Beginnig -------      )
( 1337                    )
( 1 End -------           )
(                         )
( 2 Beginnig -------      )
( [                       )
(   1,                    )
(   2,                    )
(   "three"               )
( ]                       )
( 2 End -------           )
(                         )
( 3 Beginnig -------      )
( {                       )
(   c: 1,                 )
(   fn: function (a, b) { )
(   return a + b          )
( }                       )
( }                       )
( 3 End -------           )
(                         )
 -------------------------
     o
      o
        ,__, |    | 
        (oo)\|    |___
        (__)\|    |   )\_
             |    |_w |  \
             |    |  ||   *

             Cower....[object Object]

```
### usig cowlog.logf
The logf function of the cowlog object similar top the logf
The only difference that it does not numbers the output's arguments, but shows
the name of the parameter it belongs to
    

```javascript

const cowlog = require('@vidaxl/cowlog')()
let fuct = function (a, b) {
  return a + b
}
cowlog.logf(fuct, abcz, three)

```


```
 ____________________________________________________________________________________________________________________
(                                                                                                                    )
( a Beginnig -------                                                                                                 )
( "abcz"                                                                                                             )
( a End -------                                                                                                      )
(                                                                                                                    )
( b Beginnig -------                                                                                                 )
( "three"                                                                                                            )
( b End -------                                                                                                      )
(                                                                                                                    )
( _-_-_-_-_-_-_-_-_-_-_-_                                                                                            )
(                                                                                                                    )
( called from:/home/it/dev/cowlog/tests/lib/test-runner.js:18:37                                                     )
( stack trace:/tmp/cowlog/hashes/29/7633fb83e8b9f70ad031ee375805d2a77216845d767bcf28f0cb89b02d9062_stack-trace.log   )
( session log:/tmp/cowlog/hashes/31/bf617b30b35c1ad68a03c3e090e75fb84206a6c621136929b34f2a8bc74279_session.log       )
( logged at:2018-02-14T23:27:39.486Z                                                                                 )
 --------------------------------------------------------------------------------------------------------------------
        o    ,-^-.
         o   !oYo!
          o /./=\.\______
               ##        )\/\
                ||-----w||
                ||      ||

               Cowth Vader[object Object]

```
## Curry parameters logging
We aimed to make the logging as easy as possible therefore we only exposed
the log and logf functions, tough you have many options to extpand your logging
experience, just call it again as it was a function, see it in the example below.
### logging with "last" 
We want to see sometimes a specific log entry, but possibly without too much 
work, you don't want to serach, and scroll the console, for a specific log entry
when your software end's it's execution this makes sure just before exiting
you will see the log entry created with the last curry parameter. I have chosen
this because it is easy to alter your existing cowlog.log codes. 
Of course it works with logf as well.

```javascript

const cowlog = require('@vidaxl/cowlog')()
cowlog.log(abcz, three)('last')

```


```
 ____________________
(                    )
( 0 Beginnig ------- )
( "abcz"             )
( 0 End -------      )
(                    )
( 1 Beginnig ------- )
( "three"            )
( 1 End -------      )
(                    )
 --------------------
     o
      o
          oO)-.                       .-(Oo
         /__  _\                     /_  __\
         \  \(  |     ()~()         |  )/  /
          \__|\ |    (-___-)        | /|__/
          '  '--'    ==`-'==        '--'  '[object Object]
yay

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
The following log entry is shown here because asked for it to show it again before the program exits
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

 ____________________
(                    )
( 0 Beginnig ------- )
( "abcz"             )
( 0 End -------      )
(                    )
( 1 Beginnig ------- )
( "three"            )
( 1 End -------      )
(                    )
 --------------------
     o
      o
          oO)-.                       .-(Oo
         /__  _\                     /_  __\
         \  \(  |     ()~()         |  )/  /
          \__|\ |    (-___-)        | /|__/
          '  '--'    ==`-'==        '--'  '

```

<!--- example end -->

