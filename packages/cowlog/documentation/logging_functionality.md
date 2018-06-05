<!--- destination part of cowlog begin -->
This document is part of the [Cowlog](https://github.com/vidaxl-com/cowlog) project. 
<!--- destination part of cowlog end -->

<!--- destination chat rewrite begin -->
### Chat
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/cowlog/Lobby)
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

const embededObject= {
    a: 'A',
        embeded:{
        level1:{
            level2:{
                c: null,
                    c2: 'cc',
                    array: [
                    {a: 'a', b: 'b'},
                    1,
                    1,
                    3,
                    7],
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
 ____________________________________________________________________________________________________________________
( 0 Beginnig -------                                                                                                 )
( "abcz"                                                                                                             )
( 0 End -------                                                                                                      )
( 1 Beginnig -------                                                                                                 )
( {                                                                                                                  )
(   a: "A",                                                                                                          )
(   "embeded.level1.level2.c": null,                                                                                 )
(   "embeded.level1.level2.c2": "cc",                                                                                )
(   "embeded.level1.level2.array.0.a": "a",                                                                          )
(   "embeded.level1.level2.array.0.b": "b",                                                                          )
(   "embeded.level1.level2.array.1": 1,                                                                              )
(   "embeded.level1.level2.array.2": 1,                                                                              )
(   "embeded.level1.level2.array.3": 3,                                                                              )
(   "embeded.level1.level2.array.4": 7,                                                                              )
(   "embeded.level1.level2.testObject2.c": 1,                                                                        )
(   "embeded.level1.level2.testObject2.fn": function (a, b) {                                                        )
(   return a + b                                                                                                     )
( },                                                                                                                 )
(   "embeded.level1.b": "1.5"                                                                                        )
( }                                                                                                                  )
( 1 End -------                                                                                                      )
( 2 Beginnig -------                                                                                                 )
( "This is a very long text, indeed, it has to be logn enough to be able to                                          )
( present how awesomely it breaks the strings, so you will have a convinient                                         )
(  reading expreience trough your logs."                                                                             )
( 2 End -------                                                                                                      )
( _-_-_-_-_-_-_-_-_-_-_-_                                                                                            )
( [0m [0m                                                                                                                  )
( called from:/home/it/dev/misc/cowlog/packages/cowlog/tests/lib/test-runner.js:25:36 [0m [0m                              )
( stack trace:/tmp/cowlog/hashes/83/df9210502c9fa8ac6128e33fd68f3e247f2bf0b04011612b870e9b8eeb3c00_stack-trace.log [0m [0m )
( session log:/tmp/cowlog/hashes/fe/8445d7a673eebf5d856e2226650096b4df62be8754a1c8beb134d0937266a3_session.log [0m [0m     )
( logged at:2018-04-13T19:48:09.261Z                                                                                 )
 --------------------------------------------------------------------------------------------------------------------
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
(                    )
( 0 Beginnig ------- )
( "abcz"             )
( 0 End -------      )
(                    )
 --------------------
         o
          o
                    ##        .
              ## ## ##       ==
           ## ## ## ##      ===
       /""""""""""""""""\___/ ===
  ~~~ {~~ ~~~~ ~~~ ~~~~ ~~ ~ /  ===- ~~~
       \______ o          __/
         \    \        __/
          \____\______/


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

           _                _
          / /.           _-//
         / ///         _-   /
        //_-//=========     /
      _///        //_ ||   ./
    _|                 -__-||
   |  __              - \   \
  |  |#-       _-|_           |
  |            |#|||       _   |  
 |  _==_                       ||
- ==|.=.=|_ =                  |
|  |-|-  ___                  |
|    --__   _                /
||     ===                  |
 |                     _. //
  ||_         __-   _-  _|
     \_______/  ___/  _|
                   --*

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

           _                _
          / /.           _-//
         / ///         _-   /
        //_-//=========     /
      _///        //_ ||   ./
    _|                 -__-||
   |  __              - \   \
  |  |#-       _-|_           |
  |            |#|||       _   |  
 |  _==_                       ||
- ==|.=.=|_ =                  |
|  |-|-  ___                  |
|    --__   _                /
||     ===                  |
 |                     _. //
  ||_         __-   _-  _|
     \_______/  ___/  _|
                   --*

```
### Logging an object
Objects are shown in full depth.

```javascript

const cowlog = require('cowlog')()
let fuct = function (a, b) {
  return a + b
}
cowlog.log(abcz, 1337, 1,2,three, )

```


```
 _________________________
( 0 Beginnig -------      )
( "abcz"                  )
( 0 End -------           )
( 1 Beginnig -------      )
( 1337                    )
( 1 End -------           )
( 2 Beginnig -------      )
( [                       )
(   1,                    )
(   2,                    )
(   "three"               )
( ]                       )
( 2 End -------           )
( 3 Beginnig -------      )
( {                       )
(   c: 1,                 )
(   fn: function (a, b) { )
(   return a + b          )
( }                       )
( }                       )
( 3 End -------           )
 -------------------------
  o                                  ,+*^^*+___+++_
   o                           ,*^^^^              )
    o                       _+*                     ^**+_
     o                    +^       _ _++*+_+++_,         )
              _+^^*+_    (     ,+*^ ^          \+_        )
             {       )  (    ,(    ,_+--+--,      ^)      ^\
            { (@)    } f   ,(  ,+-^ __*_*_  ^^\_   ^\       )
           {:;-/    (_+*-+^^^^^+*+*<_ _++_)_    )    )      /
          ( /  (    (        ,___    ^*+_+* )   <    <      \
           U _/     )    *--<  ) ^\-----++__)   )    )       )
            (      )  _(^)^^))  )  )\^^^^^))^*+/    /       /
          (      /  (_))_^)) )  )  ))^^^^^))^^^)__/     +^^
         (     ,/    (^))^))  )  ) ))^^^^^^^))^^)       _)
          *+__+*       (_))^)  ) ) ))^^^^^^))^^^^^)____*^
          \             \_)^)_)) ))^^^^^^^^^^))^^^^)
           (_             ^\__^^^^^^^^^^^^))^^^^^^^)
             ^\___            ^\__^^^^^^))^^^^^^^^)\\
                  ^^^^^\uuu/^^\uuu/^^^^\^\^\^\^\^\^\^\
                     ___) >____) >___   ^\_\_\_\_\_\_\)
                    ^^^//\\_^^//\\_^       ^(\_\_\_\)
                      ^^^ ^^ ^^^ ^

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
( a Beginnig -------                                                                                                 )
( "abcz"                                                                                                             )
( a End -------                                                                                                      )
( b Beginnig -------                                                                                                 )
( "three"                                                                                                            )
( b End -------                                                                                                      )
( _-_-_-_-_-_-_-_-_-_-_-_                                                                                            )
( [0m [0m                                                                                                                  )
( called from:/home/it/dev/misc/cowlog/packages/cowlog/tests/lib/test-runner.js:20:37 [0m [0m                              )
( stack trace:/tmp/cowlog/hashes/3d/8ea6d51a22e8d8d72a62a954a186c5524ee84f048da9a0f70ba45e5ea3c07a_stack-trace.log [0m [0m )
( session log:/tmp/cowlog/hashes/6b/f8ef03ae988e82c213831c5c8d808d48b6d9261ac0808de4a69ae4cc0e98b1_session.log [0m [0m     )
( logged at:2018-04-13T19:48:09.238Z                                                                                 )
 --------------------------------------------------------------------------------------------------------------------
   o
    o

           _                _
          / /.           _-//
         / ///         _-   /
        //_-//=========     /
      _///        //_ ||   ./
    _|                 -__-||
   |  __              - \   \
  |  |#-       _-|_           |
  |            |#|||       _   |  
 |  _==_                       ||
- ==|.=.=|_ =                  |
|  |-|-  ___                  |
|    --__   _                /
||     ===                  |
 |                     _. //
  ||_         __-   _-  _|
     \_______/  ___/  _|
                   --*

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
/ 0 Beginnig ------- \
| "abcz"             |
| 0 End -------      |
| 1 Beginnig ------- |
| "three"            |
\ 1 End -------      /
 --------------------
   \
    \              ....       
           ........    .      
          .            .      
         .             .      
.........              .......
..............................

Elephant inside ASCII snake
yay

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
The following log entry is shown here because asked for it to show it again before the program exits
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

 ____________________
/ 0 Beginnig ------- \
| "abcz"             |
| 0 End -------      |
| 1 Beginnig ------- |
| "three"            |
\ 1 End -------      /
 --------------------
   \
    \              ....       
           ........    .      
          .            .      
         .             .      
.........              .......
..............................

Elephant inside ASCII snake

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
( 0 Beginnig ------- )
( "bla-bla-bla"      )
( 0 End -------      )
( 1 Beginnig ------- )
( "bla-bla-bla"      )
( 1 End -------      )
( 2 Beginnig ------- )
( "bla-bla-bla"      )
( 2 End -------      )
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

            COW-OPERATION                           
 ____________________
( 0 Beginnig ------- )
( "abcz"             )
( 0 End -------      )
( 1 Beginnig ------- )
( "barvalue1"        )
( 1 End -------      )
( 2 Beginnig ------- )
( 1                  )
( 2 End -------      )
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

            COW-OPERATION                           
 ____________________
( 0 Beginnig ------- )
( "abcz"             )
( 0 End -------      )
( 1 Beginnig ------- )
( "barvalue2"        )
( 1 End -------      )
( 2 Beginnig ------- )
( 2                  )
( 2 End -------      )
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

            COW-OPERATION                           
yay

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
The following log entry is shown here because asked for it to show it again before the program exits
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

 ____________________
( 0 Beginnig ------- )
( "abcz"             )
( 0 End -------      )
( 1 Beginnig ------- )
( "barvalue1"        )
( 1 End -------      )
( 2 Beginnig ------- )
( 1                  )
( 2 End -------      )
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

            COW-OPERATION                           
 ____________________
( 0 Beginnig ------- )
( "abcz"             )
( 0 End -------      )
( 1 Beginnig ------- )
( "barvalue2"        )
( 1 End -------      )
( 2 Beginnig ------- )
( 2                  )
( 2 End -------      )
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

            COW-OPERATION                           

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
/ 0 Beginnig ------- \
| "abcz"             |
| 0 End -------      |
| 1 Beginnig ------- |
| "barvalue2"        |
\ 1 End -------      /
 --------------------
  \
   \
       __     
      UoOU\.'@@@@@@`.
      \__/(@@@@@@@@@@)
           (@@@@@@@@)
           `YY~~~~YY'
            ||    ||

```

<!--- docs functionality end -->

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
--><!--- destination qa rewrite end -->
