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

Cowlog is made for developers, helping them to debug their application. It is 
a library that helps you identify your debug message quickly on the console 
output. The project is meant to be used solely in a **nodejs environment** as these 
days browsers provide really neat standard toolsets for debugging your 
applications.

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

<!--- example begin -->
### That's the way you like it
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
( session log:/tmp/cowlog/hashes/60/69a572ccdad540bcf2310f09505535dc4bf33955016eaefe974065b26fcbd0_session.log       )
( logged at:2018-02-15T11:29:09.400Z                                                                                 )
 --------------------------------------------------------------------------------------------------------------------
  o            .    .     .   
   o      .  . .     `  ,     
    o    .; .  : .' :  :  : . 
     o   i..`: i` i.i.,i  i . 
      o   `,--.|i |i|ii|ii|i: 
           UoOU\.'@@@@@@`.||' 
           \__/(@@@@@@@@@@)'  
                (@@@@@@@@)    
                `YY~~~~YY'    
                 ||    ||

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
      \  (__)  
         (\/)  
  /-------\/    
 / | 666 ||    
*  ||----||      
   ~~    ~~

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
  \
     \
                  _ _
       | \__/|  .~    ~.
       /oO `./      .'
      {o__,   \    {
        / .  . )    \
        `-` '-' \    }
       .(   _(   )_.'
      '---.~_ _ _|

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
 o     /\  ___  /\
  o   // \/   \/ \\
     ((    O O    ))
      \\ /     \ //
       \/  | |  \/ 
        |  | |  |  
        |  | |  |  
        |   o   |  
        | |   | |  
        |m|   |m|

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
       o    ____
        o  /    \
          | ^__^ |
          | (oO) |______
          | (__) |      )\/\
           \____/|----w |
                ||     ||

	         Moofasa

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
( session log:/tmp/cowlog/hashes/4c/fb415934c018bcf93b07e57a9ebfafe2f0a00ad833638e2a9b53ee01e6d3b0_session.log       )
( logged at:2018-02-15T11:04:36.724Z                                                                                 )
 --------------------------------------------------------------------------------------------------------------------
    o
     o
                                   .::!!!!!!!:.
  .!!!!!:.                        .:!!!!!!!!!!!!
  ~~~~!!!!!!.                 .:!!!!!!!!!UWWW$$$ 
      :$$NWX!!:           .:!!!!!!XUWW$$$$$$$$$P 
      $$$$$##WX!:      .<!!!!UW$$$$"  $$$$$$$$# 
      $$$$$  $$$UX   :!!UW$$$$$$$$$   4$$$$$* 
      ^$$$B  $$$$\     $$$$$$$$$$$$   d$$R" 
        "*$bd$$$$      '*$$$$$$$$$$$o+#" 
             """"          """""""

```
## Altering your logs with curry parameters
We aimed to make the logging as easy as possible therefore we only exposed
the log and logf functions, tough you have many options to extpand your logging
experience, just call it again as it was a function, see it in the example below.
### logging with "last" 
We want to see sometimes a specific log entry, but possibly without too much 
work, you don't want to search, and scroll the console, for a specific log entry
when your software end's it's execution this makes sure just before exiting
you will see the log entry created with the last curry parameter. I have chosen
this because it is easy to alter your existing cowlog.log codes. 
Of course all curry magic works with logf as well.

```javascript

const cowlog = require('@vidaxl/cowlog')()
cowlog.log(abcz, three)('last')

```


```
 ____________________
/                    \
| 0 Beginnig ------- |
| "abcz"             |
| 0 End -------      |
|                    |
| 1 Beginnig ------- |
| "three"            |
| 1 End -------      |
\                    /
 --------------------
  \
   \   \_\_    _/_/
    \      \__/
           (oO)\_______
           (__)\       )\/\
            U  ||----- |
               ||     ||
yay

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
The following log entry is shown here because asked for it to show it again before the program exits
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

 ____________________
/                    \
| 0 Beginnig ------- |
| "abcz"             |
| 0 End -------      |
|                    |
| 1 Beginnig ------- |
| "three"            |
| 1 End -------      |
\                    /
 --------------------
  \
   \   \_\_    _/_/
    \      \__/
           (oO)\_______
           (__)\       )\/\
            U  ||----- |
               ||     ||

```
### lasts at last
Lasts curry parameter gives you the same information that last does, but it
will display more log entries after your application exited and you called more 
cowlog.log with lasts currying. If you log with "last" after "lasts" this will 
overwrite "lasts" displaying at the end, but if you call "lasts" before you 
registered a "last" logging it will show all of them at the end.
    
    

```javascript

const cowlog = require('@vidaxl/cowlog')()
cowlog.log('bla-bla-bla', 'bla-bla-bla', 'bla-bla-bla')
cowlog.log('abcz', 'barvalue1', 1)('lasts')
cowlog.log('abcz', 'barvalue2', 2)('lasts')
console.log('yay')

```


```
 ____________________
/                    \
| 0 Beginnig ------- |
| "bla-bla-bla"      |
| 0 End -------      |
|                    |
| 1 Beginnig ------- |
| "bla-bla-bla"      |
| 1 End -------      |
|                    |
| 2 Beginnig ------- |
| "bla-bla-bla"      |
| 2 End -------      |
\                    /
 --------------------
       \   ,__,
        \  (oO)____
           (__)    )\
            U ||--|| *
 ____________________
/                    \
| 0 Beginnig ------- |
| "abcz"             |
| 0 End -------      |
|                    |
| 1 Beginnig ------- |
| "barvalue1"        |
| 1 End -------      |
|                    |
| 2 Beginnig ------- |
| 1                  |
| 2 End -------      |
\                    /
 --------------------
       \   ,__,
        \  (oO)____
           (__)    )\
            U ||--|| *
 ____________________
/                    \
| 0 Beginnig ------- |
| "abcz"             |
| 0 End -------      |
|                    |
| 1 Beginnig ------- |
| "barvalue2"        |
| 1 End -------      |
|                    |
| 2 Beginnig ------- |
| 2                  |
| 2 End -------      |
\                    /
 --------------------
       \   ,__,
        \  (oO)____
           (__)    )\
            U ||--|| *
yay

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
The following log entry is shown here because asked for it to show it again before the program exits
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

 ____________________
/                    \
| 0 Beginnig ------- |
| "abcz"             |
| 0 End -------      |
|                    |
| 1 Beginnig ------- |
| "barvalue1"        |
| 1 End -------      |
|                    |
| 2 Beginnig ------- |
| 1                  |
| 2 End -------      |
\                    /
 --------------------
       \   ,__,
        \  (oO)____
           (__)    )\
            U ||--|| *

 ____________________
/                    \
| 0 Beginnig ------- |
| "abcz"             |
| 0 End -------      |
|                    |
| 1 Beginnig ------- |
| "barvalue2"        |
| 1 End -------      |
|                    |
| 2 Beginnig ------- |
| 2                  |
| 2 End -------      |
\                    /
 --------------------
       \   ,__,
        \  (oO)____
           (__)    )\
            U ||--|| *


```
### Using  "die" curry parameter
Use "die" curry parameter if you want to end your software just here, so 
everything after it comes will not be executed.    
    

```javascript

const cowlog = require('@vidaxl/cowlog')()
cowlog.log('abcz', 'barvalue2')('die')

console.log('yay')

```


```
 ____________________
/                    \
| 0 Beginnig ------- |
| "abcz"             |
| 0 End -------      |
|                    |
| 1 Beginnig ------- |
| "barvalue2"        |
| 1 End -------      |
\                    /
 --------------------
 \     /\  ___  /\
  \   // \/   \/ \\
     ((    O O    ))
      \\ /     \ //
       \/  | |  \/ 
        |  | |  |  
        |  | |  |  
        |   o   |  
        | |   | |  
        |m|   |m|

```

<!--- example end -->

