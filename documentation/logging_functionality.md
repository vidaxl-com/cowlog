<!--- destination cowlog rewrite begin -->
This document is part of the [Cowlog](https://github.com/vidaxl-com/cowlog) project. 
<!--- destination cowlog rewrite end -->
<!--- destination chat rewrite begin -->
### Chat
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/cowlog/Lobby)
<!--- destination chat rewrite end -->
## Logging
Hereby we go one by one the logging features cowlog provides to you.

<!--- docs functionality begin -->
### basic logging
You will see all information with cowlog, no need to have 
specially trained eye for development log messages, or special identifiable 
strings, before and after you want to see. 

- **session log**: Every time cowlog is called, the result is logged in a 
separate file. That way, all the logs can be found through the path displayed 
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
( session log:/tmp/cowlog/hashes/4e/5dfecfc9febb1c7873c06c5f93e5c740b71bf10af0c05dba6d4eb5a0892645_session.log       )
( logged at:2018-02-20T16:59:33.180Z                                                                                 )
 --------------------------------------------------------------------------------------------------------------------
                       o                    ^    /^
                        o                  / \  // \
                         o   |\___/|      /   \//  .\
                          o  /O  O  \__  /    //  | \ \           *----*
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
## Plugin system, configuration management
Cowlog provides a lot of information, so you can always see 
where you were logging from, but you can turn the details off by initializing 
cowlog with the "clean" configuration. The details at the bottom are just 
a product of a plugin that you can disable with ease. For the rest of the 
examples let's turn them off, so we will have to scroll a bit less.
    
### logging with the "clean" configuration
Only use it if you have good reason like I have at the moment, because you 
will loose many interesting details and it is all about the details.

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
        \    ,-^-.
         \   !oYo!
          \ /./=\.\______
               ##        )\/\
                ||-----w||
                ||      ||

               Cowth Vader[object Object]

```
## More fancy data
Our descision is to show it all always for you, so you can have more 
educated opinion on the state of affairs within you application
### Logging an array

```javascript

const cowlog = require('cowlog')()
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
      /\_)o<
     |      \
     | O . O|
      \_____/

```
### Logging a function
You will see the functions without calling the toString() function. This is 
nothing too extraordinary, but if you don't have to type, you can focus on more 
meaningful stuff.


```javascript

const cowlog = require('cowlog')()
let fuct = function testFunction(a, b) {
  return a + b;
}
cowlog.log(fuct)


```


```
 _______________________________
/                               \
| 0 Beginnig -------            |
| function testFunction(a, b) { |
|   return a + b;               |
| }                             |
| 0 End -------                 |
\                               /
 -------------------------------
     \
      \
          oO)-.                       .-(Oo
         /__  _\                     /_  __\
         \  \(  |     ()~()         |  )/  /
          \__|\ |    (-___-)        | /|__/
          '  '--'    ==`-'==        '--'  '[object Object]

```
### Logging an object
Objects are shown in full depth.

```javascript

const cowlog = require('cowlog')()
let fuct = function testFunction(a, b) {
  return a + b;
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
   o
    o
    ____  
   /# /_\_
  |  |/o\o\
  |  \\_/_/
 / |_   |  
|  ||\_ ~| 
|  ||| \/  
|  |||_    
 \//  |    
  ||  |    
  ||_  \   
  \_|  o|  
  /\___/   
 /  ||||__ 
    (___)_)[object Object]

```
### usig cowlog.logf
The logf function of the cowlog object is similar to the logf.
The only difference is that it does not numbers the output's arguments, but shows
the name of the parameter it belongs to. See the example below.
    

```javascript

const cowlog = require('cowlog')()
let fuct = function testFunction(a, b) {
  return a + b;
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
( called from:/home/it/dev/cowlog/test-build/lib/test-runner.js:21:37                                                )
( stack trace:/tmp/cowlog/hashes/02/0ef2c5f383704b587c6176b42cf853a12820061863631628a1e60e74b71a0b_stack-trace.log   )
( session log:/tmp/cowlog/hashes/1b/ad54169dac89fdf6363acb7c40c65dca0f4d441165e3c08c3481725b7f5c78_session.log       )
( logged at:2018-02-20T16:59:33.301Z                                                                                 )
 --------------------------------------------------------------------------------------------------------------------
        o
         o
          )__(
         '|oO|'________/
          |__|         |
           U ||"""""""||
             ||       ||


```
## Altering your logs with curry parameters
We aimed to make the logging as easy as possible therefore we only exposed
the log and logf functions, though you have many options to expand your logging
experience. Just call it again as it was a function, as in the example below.
### logging with "last" 
We want to see sometimes a specific log entry, but possibly without too much 
work. Maybe you don't want to search and scroll the console for a specific log entry
when your software ends it's execution. This configuration makes sure, just before exiting,
you will see the log entry created with the last curry parameter. I have chosen
this because it is easy to alter your existing cowlog.log codes. 
Of course all curry magic works with logf as well.

```javascript

const cowlog = require('cowlog')()
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
     \
                                   .::!!!!!!!:.
  .!!!!!:.                        .:!!!!!!!!!!!!
  ~~~~!!!!!!.                 .:!!!!!!!!!UWWW$$$ 
      :$$NWX!!:           .:!!!!!!XUWW$$$$$$$$$P 
      $$$$$##WX!:      .<!!!!UW$$$$"  $$$$$$$$# 
      $$$$$  $$$UX   :!!UW$$$$$$$$$   4$$$$$* 
      ^$$$B  $$$$\     $$$$$$$$$$$$   d$$R" 
        "*$bd$$$$      '*$$$$$$$$$$$o+#" 
             """"          """"""" [object Object]
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
     \
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
### lasts at last
Lasts curry parameter gives you the same information that last does, but it
will display more log entries after your application exited and you called more 
cowlog.log with lasts currying. If you log with "last" after "lasts" this will 
overwrite "lasts" displaying at the end, but if you call "lasts" before you 
registered a "last" logging it will show all of them at the end.
    
    

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

const cowlog = require('cowlog')()
cowlog.log('abcz', 'barvalue2')('die')

console.log('yay')

```


```
 ____________________
(                    )
( 0 Beginnig ------- )
( "abcz"             )
( 0 End -------      )
(                    )
( 1 Beginnig ------- )
( "barvalue2"        )
( 1 End -------      )
(                    )
 --------------------
  o
   o          .
       ___   //
     {~._.~}//
      ( Y )K/  
     ()~*~()   
     (_)-(_)   
     Luke    
     Sywalker
     koala

```

<!--- docs functionality end -->
