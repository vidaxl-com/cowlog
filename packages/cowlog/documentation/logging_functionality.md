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

- **session log**: Every you call cowlog, the results appear in a
separate file. 

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
                    1, 1, 3, 7],
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
 _______________________________________________________________________________________
( 0 Beginnig -------                                                                    )
( "abcz"                                                                                )
( 0 End -------                                                                         )
( 1 Beginnig -------                                                                    )
( {                                                                                     )
(   a: "A",                                                                             )
(   "embeded.level1.level2.c": null,                                                    )
(   "embeded.level1.level2.c2": "cc",                                                   )
(   "embeded.level1.level2.array.0.a": "a",                                             )
(   "embeded.level1.level2.array.0.b": "b",                                             )
(   "embeded.level1.level2.array.1": 1,                                                 )
(   "embeded.level1.level2.array.2": 1,                                                 )
(   "embeded.level1.level2.array.3": 3,                                                 )
(   "embeded.level1.level2.array.4": 7,                                                 )
(   "embeded.level1.level2.testObject2.c": 1,                                           )
(   "embeded.level1.level2.testObject2.fn": function (a, b) {                           )
(   return a + b                                                                        )
( },                                                                                    )
(   "embeded.level1.b": "1.5"                                                           )
( }                                                                                     )
( 1 End -------                                                                         )
( 2 Beginnig -------                                                                    )
( "This is a very long text. Indeed, it has to be long enough to be able to             )
( present how awesomely it breaks the strings so that you will have a conven            )
( ient reading experience through your logs."                                           )
( 2 End -------                                                                         )
( _-_-_-_-_-_-_-_-_-_-_-_                                                               )
(                                                                                       )
( called from:/home/it/dev/misc/cowlog/packages/cowlog/tests/lib/test-runner.js:25:36   )
( stack trace:/tmp/cowlog/hashes/cc/22cd81245f410caa812da8c1f38657_stack-trace.log      )
( session log:/tmp/cowlog/hashes/9a/af49d2ddb297ea1a2673d3a7f1d27c_session.log          )
( logged at:2018-06-11T12:49:56.481Z                                                    )
 ---------------------------------------------------------------------------------------
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
    \        .
     .---.  //
    Y|o o|Y// 
   /_(i=i)K/ 
   ~()~*~()~  
    (_)-(_)   

     Darth 
     Vader    
     koala

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
            ^__^ 
    _______/(oO)
/\/(       /(__)
   | W----|| |~|
   ||     || |~|  ~~
             |~|  ~
             |_| o
             |#|/
            _+#+_

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
        ,__, |    | 
        (oo)\|    |___
        (__)\|    |   )\_
             |    |_w |  \
             |    |  ||   *

             Cower....

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
 _________________________
/ 0 Beginnig -------      \
| "abcz"                  |
| 0 End -------           |
| 1 Beginnig -------      |
| 1337                    |
| 1 End -------           |
| 2 Beginnig -------      |
| [                       |
|   1,                    |
|   2,                    |
|   "three"               |
| ]                       |
| 2 End -------           |
| 3 Beginnig -------      |
| {                       |
|   c: 1,                 |
|   fn: function (a, b) { |
|   return a + b          |
| }                       |
| }                       |
\ 3 End -------           /
 -------------------------
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
            //    \\               ///-._ _ _ _ _ _ _{^ 

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
 _______________________________________________________________________________________
( a Beginnig -------                                                                    )
( "abcz"                                                                                )
( a End -------                                                                         )
( b Beginnig -------                                                                    )
( "three"                                                                               )
( b End -------                                                                         )
( _-_-_-_-_-_-_-_-_-_-_-_                                                               )
(                                                                                       )
( called from:/home/it/dev/misc/cowlog/packages/cowlog/tests/lib/test-runner.js:20:37   )
( stack trace:/tmp/cowlog/hashes/28/1b12bd3d7e59ed99229774871e1af0_stack-trace.log      )
( session log:/tmp/cowlog/hashes/65/74a598be13a82caeaf2037afc9e75d_session.log          )
( logged at:2018-06-11T12:49:56.557Z                                                    )
 ---------------------------------------------------------------------------------------
     o
      o
        ,__, |    | 
        (oo)\|    |___
        (__)\|    |   )\_
             |    |_w |  \
             |    |  ||   *

             Cower....

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
( 0 Beginnig ------- )
( "abcz"             )
( 0 End -------      )
( 1 Beginnig ------- )
( "three"            )
( 1 End -------      )
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
( "three"            )
( 1 End -------      )
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
/ 0 Beginnig ------- \
| "bla-bla-bla"      |
| 0 End -------      |
| 1 Beginnig ------- |
| "bla-bla-bla"      |
| 1 End -------      |
| 2 Beginnig ------- |
| "bla-bla-bla"      |
\ 2 End -------      /
 --------------------
     \
      \  (__)  
         (\/)  
  /-------\/    
 / | 666 ||    
*  ||----||      
   ~~    ~~
 ____________________
/ 0 Beginnig ------- \
| "abcz"             |
| 0 End -------      |
| 1 Beginnig ------- |
| "barvalue1"        |
| 1 End -------      |
| 2 Beginnig ------- |
| 1                  |
\ 2 End -------      /
 --------------------
     \
      \  (__)  
         (\/)  
  /-------\/    
 / | 666 ||    
*  ||----||      
   ~~    ~~      
 ____________________
/ 0 Beginnig ------- \
| "abcz"             |
| 0 End -------      |
| 1 Beginnig ------- |
| "barvalue2"        |
| 1 End -------      |
| 2 Beginnig ------- |
| 2                  |
\ 2 End -------      /
 --------------------
     \
      \  (__)  
         (\/)  
  /-------\/    
 / | 666 ||    
*  ||----||      
   ~~    ~~      
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
| "barvalue1"        |
| 1 End -------      |
| 2 Beginnig ------- |
| 1                  |
\ 2 End -------      /
 --------------------
     \
      \  (__)  
         (\/)  
  /-------\/    
 / | 666 ||    
*  ||----||      
   ~~    ~~      
 ____________________
/ 0 Beginnig ------- \
| "abcz"             |
| 0 End -------      |
| 1 Beginnig ------- |
| "barvalue2"        |
| 1 End -------      |
| 2 Beginnig ------- |
| 2                  |
\ 2 End -------      /
 --------------------
     \
      \  (__)  
         (\/)  
  /-------\/    
 / | 666 ||    
*  ||----||      
   ~~    ~~      

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
( 0 Beginnig ------- )
( "abcz"             )
( 0 End -------      )
( 1 Beginnig ------- )
( "barvalue2"        )
( 1 End -------      )
 --------------------
   o
    o              ....       
           ........    .      
          .            .      
         .             .      
.........              .......
..............................

Elephant inside ASCII snake[object Object]

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
