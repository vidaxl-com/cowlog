<!--- destination part of cowlog begin -->
This document is part of the [Cowlog](https://github.com/vidaxl-com/cowlog) project. 
<!--- destination part of cowlog end -->

<!--- destination chat rewrite begin -->
<!--- destination chat rewrite end -->
## Logging
Hereby we go one by one the logging features cowlog provides to you.

<!--- docs functionality begin -->
### basic logging
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
     

```javascript

const cowlog = require('cowlog')()
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
( called from:/home/it/dev/cowlog/test-build/lib/test-runner.js:26:36                                                )
( stack trace:/tmp/cowlog/hashes/6f/f3975a9621b6f86e7184f4cd9e0f77b3473c4c7cf34fe095c282ba1b0842fe_stack-trace.log   )
( session log:/tmp/cowlog/hashes/38/a826076290daf638a81e58c5a12520b2f3c1665e171f77a7e46d1acd72989d_session.log       )
( logged at:2018-02-27T16:56:25.547Z                                                                                 )
 --------------------------------------------------------------------------------------------------------------------
  o
   o
      /\_)o<
     |      \
     | O . O|
      \_____/

```
## Plugin system, configuration management
Cowlog provides a lot of information, so you can always see 
where you were logging from, but you can turn the details off by initializing 
cowlog with the "clean" configuration. The details at the bottom are just a 
product of a plugin that you can disable with ease. For the rest of the 
examples let's turn them off, so we will have to scroll a bit less.
    
### logging with the "clean" configuration
Only use it if you have a good reason like I have at the moment because of you 
will lose many interesting details and it is all about the details.

```javascript

const cowlog = require('cowlog')('clean')
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
      .( o ).

```
## More fancy data
We decided to show it all always for you so that you can have more 
educated opinion on the state of affairs within your application
### Logging an array

```javascript

const cowlog = require('cowlog')()
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
       ("`-'  '-/") .___..--' ' "`-._
         ` *_ *  )    `-.   (      ) .`-.__. `)
         (_Y_.) ' ._   )   `._` ;  `` -. .-'
      _.. `--'_..-_/   /--' _ .' ,4
   ( i l ),-''  ( l i),'  ( ( ! .-'   

```
### Logging a function
You will see the functions without calling the toString() function. This is 
nothing too extraordinary, but if you don't have to type, you can focus on more 
important stuff.


```javascript

const cowlog = require('cowlog')()
let fuct = function (a, b) {
  return a + b
}
cowlog.log(fuct)


```


```
 _______________________________
(                               )
( 0 Beginnig -------            )
( function testFunction(a, b) { )
(   return a + b;               )
( }                             )
( 0 End -------                 )
(                               )
 -------------------------------
  o
     o
                  _ _
       | \__/|  .~    ~.
       /oO `./      .'
      {o__,   \    {
        / .  . )    \
        `-` '-' \    }
       .(   _(   )_.'
      '---.~_ _ _|
                                                     [object Object]

```
### Logging an object
Objects are shown in full depth.

```javascript

const cowlog = require('cowlog')()
let fuct = function (a, b) {
  return a + b
}
cowlog.log(abcz, 1337, 1,2,three, [object Object])

```


```
 _____________________________________
(                                     )
( 0 Beginnig -------                  )
( "abcz"                              )
( 0 End -------                       )
(                                     )
( 1 Beginnig -------                  )
( 1337                                )
( 1 End -------                       )
(                                     )
( 2 Beginnig -------                  )
( [                                   )
(   1,                                )
(   2,                                )
(   "three"                           )
( ]                                   )
( 2 End -------                       )
(                                     )
( 3 Beginnig -------                  )
( {                                   )
(   c: 1,                             )
(   fn: function testFunction(a, b) { )
(   return a + b;                     )
( }                                   )
( }                                   )
( 3 End -------                       )
(                                     )
 -------------------------------------
       o   ,__,
        o  (oO)____
           (__)    )\
            U ||--|| *

```
### usig cowlog.logf
The logf function of the cowlog object is similar to the logf.
The only difference is that it does not number the output's arguments, but shows
the name of the parameter it belongs to. See the example below.
    

```javascript

const cowlog = require('cowlog')()
let fuct = function (a, b) {
  return a + b
}
cowlog.logf(fuct, abcz, three)

```


```
 ____________________________________________________________________________________________________________________
/                                                                                                                    \
| a Beginnig -------                                                                                                 |
| "abcz"                                                                                                             |
| a End -------                                                                                                      |
|                                                                                                                    |
| b Beginnig -------                                                                                                 |
| "three"                                                                                                            |
| b End -------                                                                                                      |
|                                                                                                                    |
| _-_-_-_-_-_-_-_-_-_-_-_                                                                                            |
|                                                                                                                    |
| called from:/home/it/dev/cowlog/test-build/lib/test-runner.js:21:37                                                |
| stack trace:/tmp/cowlog/hashes/02/0ef2c5f383704b587c6176b42cf853a12820061863631628a1e60e74b71a0b_stack-trace.log   |
| session log:/tmp/cowlog/hashes/af/5495fa6b5a6036eea195720aa75687cdad8f30c35784d723d79ab3d4caf695_session.log       |
\ logged at:2018-02-27T16:56:25.732Z                                                                                 /
 --------------------------------------------------------------------------------------------------------------------
     \
      \
          oO)-.                       .-(Oo
         /__  _\                     /_  __\
         \  \(  |     ()~()         |  )/  /
          \__|\ |    (-___-)        | /|__/
          '  '--'    ==`-'==        '--'  '

```
## Altering your logs with curry parameters
We aimed to make the logging as easy as possible therefore we only exposed
the log and logf functions, though you have many options to expand your logging
experience. Just call it again as it was a function, as in the example below.
### logging with "last" 
We want to see sometimes a specific log entry, but possibly without too much 
work. Maybe you don't want to search and scroll the console for a particular log entry
when your software ends its execution. This configuration makes sure, just before exiting,
you will see the log entry created with the last curry parameter. I have chosen
this because it is easy to alter your existing cowlog.log codes. 
Of course, all curry magic works with logf as well.

```javascript

const cowlog = require('cowlog')()
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
      _____   _________
     /     \_/         |
    |                 ||
    |                 ||
   |    ###\  /###   | |
   |     0  \/  0    | |
  /|                 | |
 / |        <        |\ \
| /|                 | | |
| |     \_______/   |  | |
| |                 | / /
/||                 /|||
   ----------------|
        | |    | |
        ***    ***
       /___\  /___\
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
      _____   _________
     /     \_/         |
    |                 ||
    |                 ||
   |    ###\  /###   | |
   |     0  \/  0    | |
  /|                 | |
 / |        <        |\ \
| /|                 | | |
| |     \_______/   |  | |
| |                 | / /
/||                 /|||
   ----------------|
        | |    | |
        ***    ***
       /___\  /___\

```
### lasts at last
Lasts curry parameter gives you the same information that last does, but it
will display more log entries after your application exited and you called more 
cowlog.log with lasts currying. If you log with "last" after "lasts" this will 
overwrite "lasts" displaying at the end, but if you call "lasts" before you 
registered "last" logging, it will show all of them at the end.
    
    

```javascript

const cowlog = require('cowlog')()
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
                       \                    ^    /^
                        \                  / \  // \
                         \   |\___/|      /   \//  .\
                          \  /O  O  \__  /    //  | \ \           *----*
                            /     /  \/_/    //   |  \  \          \   |
                            @___@`    \/_   //    |   \   \         \/\ \
                           0/0/|       \/_ //     |    \    \         \  \
                       0/0/0/0/|        \///      |     \     \       |  |
                    0/0/0/0/0/_|_ /   (  //       |      \     _\     |  /
                 0/0/0/0/0/0/`/,_ _ _/  ) ; -.    |    _ _\.-~       /   /
                             ,-}        _      *-.|.-~-.           .~    ~
            \     \__/        `/\      /                 ~-. _ .-~      /
             \____(oO)           *.   }            {                   /
             (    (--)          .----~-.\        \-`                 .~
             //__\\  \__ Ack!   ///.----..<        \             _ -~
            //    \\               ///-._ _ _ _ _ _ _{^ - - - - ~[object Object]
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
                       \                    ^    /^
                        \                  / \  // \
                         \   |\___/|      /   \//  .\
                          \  /O  O  \__  /    //  | \ \           *----*
                            /     /  \/_/    //   |  \  \          \   |
                            @___@`    \/_   //    |   \   \         \/\ \
                           0/0/|       \/_ //     |    \    \         \  \
                       0/0/0/0/|        \///      |     \     \       |  |
                    0/0/0/0/0/_|_ /   (  //       |      \     _\     |  /
                 0/0/0/0/0/0/`/,_ _ _/  ) ; -.    |    _ _\.-~       /   /
                             ,-}        _      *-.|.-~-.           .~    ~
            \     \__/        `/\      /                 ~-. _ .-~      /
             \____(oO)           *.   }            {                   /
             (    (--)          .----~-.\        \-`                 .~
             //__\\  \__ Ack!   ///.----..<        \             _ -~
            //    \\               ///-._ _ _ _ _ _ _{^ - - - - ~
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
                       \                    ^    /^
                        \                  / \  // \
                         \   |\___/|      /   \//  .\
                          \  /O  O  \__  /    //  | \ \           *----*
                            /     /  \/_/    //   |  \  \          \   |
                            @___@`    \/_   //    |   \   \         \/\ \
                           0/0/|       \/_ //     |    \    \         \  \
                       0/0/0/0/|        \///      |     \     \       |  |
                    0/0/0/0/0/_|_ /   (  //       |      \     _\     |  /
                 0/0/0/0/0/0/`/,_ _ _/  ) ; -.    |    _ _\.-~       /   /
                             ,-}        _      *-.|.-~-.           .~    ~
            \     \__/        `/\      /                 ~-. _ .-~      /
             \____(oO)           *.   }            {                   /
             (    (--)          .----~-.\        \-`                 .~
             //__\\  \__ Ack!   ///.----..<        \             _ -~
            //    \\               ///-._ _ _ _ _ _ _{^ - - - - ~
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
                       \                    ^    /^
                        \                  / \  // \
                         \   |\___/|      /   \//  .\
                          \  /O  O  \__  /    //  | \ \           *----*
                            /     /  \/_/    //   |  \  \          \   |
                            @___@`    \/_   //    |   \   \         \/\ \
                           0/0/|       \/_ //     |    \    \         \  \
                       0/0/0/0/|        \///      |     \     \       |  |
                    0/0/0/0/0/_|_ /   (  //       |      \     _\     |  /
                 0/0/0/0/0/0/`/,_ _ _/  ) ; -.    |    _ _\.-~       /   /
                             ,-}        _      *-.|.-~-.           .~    ~
            \     \__/        `/\      /                 ~-. _ .-~      /
             \____(oO)           *.   }            {                   /
             (    (--)          .----~-.\        \-`                 .~
             //__\\  \__ Ack!   ///.----..<        \             _ -~
            //    \\               ///-._ _ _ _ _ _ _{^ - - - - ~
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
                       \                    ^    /^
                        \                  / \  // \
                         \   |\___/|      /   \//  .\
                          \  /O  O  \__  /    //  | \ \           *----*
                            /     /  \/_/    //   |  \  \          \   |
                            @___@`    \/_   //    |   \   \         \/\ \
                           0/0/|       \/_ //     |    \    \         \  \
                       0/0/0/0/|        \///      |     \     \       |  |
                    0/0/0/0/0/_|_ /   (  //       |      \     _\     |  /
                 0/0/0/0/0/0/`/,_ _ _/  ) ; -.    |    _ _\.-~       /   /
                             ,-}        _      *-.|.-~-.           .~    ~
            \     \__/        `/\      /                 ~-. _ .-~      /
             \____(oO)           *.   }            {                   /
             (    (--)          .----~-.\        \-`                 .~
             //__\\  \__ Ack!   ///.----..<        \             _ -~
            //    \\               ///-._ _ _ _ _ _ _{^ - - - - ~

```
### Using  "die" curry parameter
Use "die" curry parameter if you want to end your software just here, 
      after it comes, will not be executed.     
    

```javascript

const cowlog = require('cowlog')()
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
        \    ,-^-.
         \   !oYo!
          \ /./=\.\______
               ##        )\/\
                ||-----w||
                ||      ||

               Cowth Vader

```

<!--- docs functionality end -->

<!--- destination qa rewrite begin -->
### QA
[![CircleCI](https://circleci.com/gh/vidaxl-com/cowlog/tree/master.svg?style=svg)](https://circleci.com/gh/vidaxl-com/cowlog/tree/master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/test_coverage)](https://codeclimate.com/github/vidaxl-com/cowlog/test_coverage)
[![bitHound Overall Score](https://www.bithound.io/github/vidaxl-com/cowlog/badges/score.svg)](https://www.bithound.io/github/vidaxl-com/cowlog)
[![bitHound Dependencies](https://www.bithound.io/github/vidaxl-com/cowlog/badges/dependencies.svg)](https://www.bithound.io/github/vidaxl-com/cowlog/master/dependencies/npm)
[![Maintainability](https://api.codeclimate.com/v1/badges/d3fce811aecbe5c73ffb/maintainability)](https://codeclimate.com/github/vidaxl-com/cowlog/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/vidaxl-com/cowlog/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vidaxl-com/cowlog?targetFile=package.json)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvidaxl-com%2Fcowlog?ref=badge_shield)
[![Greenkeeper badge](https://badges.greenkeeper.io/vidaxl-com/cowlog.svg)](https://greenkeeper.io/)
<!--- destination qa rewrite end -->
