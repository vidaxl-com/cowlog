[![Tests](https://circleci.com/bb/tothimre/cowlog/tree/di_and_tests.svg?style=shield)](https://circleci.com/bb/tothimre/cowlog)
[![Coverage Status](https://coveralls.io/repos/bitbucket/tothimre/cowlog/badge.svg?branch=di_and_tests)](https://coveralls.io/bitbucket/tothimre/cowlog?branch=master)
[![bitHound Overall Score](https://www.bithound.io/bitbucket/tothimre/cowlog/badges/score.svg)](https://www.bithound.io/bitbucket/tothimre/cowlog)
[![bitHound Dependencies](https://www.bithound.io/bitbucket/tothimre/cowlog/badges/dependencies.svg)](https://www.bithound.io/bitbucket/tothimre/cowlog/di_and_tests/dependencies/npm)
[![Maintainability](https://api.codeclimate.com/v1/badges/54dfbe1f8c279d36c6db/maintainability)](https://codeclimate.com/github/tothimre/cowlog/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/54dfbe1f8c279d36c6db/test_coverage)](https://codeclimate.com/github/tothimre/cowlog/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/tothimre/cowlog/badge.svg)](https://snyk.io/test/github/tothimre/cowlog)

# Cowlog

A small wrapper around cowsay library so you can identify your debug message quickly on the console output. The project is meant to be used solely in a nodejs environment, within the browsers you can use the `console.log()` quite efficiently.

## Installation
In case the npm.vidaxl.com is not accessible (as it is now) go to the `mode_modules` directory
create the `@vidaxl` directory within this new directory `git clone ssh://git@192.168.11.226:7999/npmlib/cowlog.git`
then `cd cowlog;` after `npm install`.

According to the examples, you can use it.

## Usage
### Logging a plain object
```javascript
let cowlog = require("@vidaxl/cowlog")()`;

cowlog.log({a:'b'})`;
````
This will output something like this (monospaced) 
```

/ {           \
|   aa: "bbb" |
\ }           /
 -------------
        \   ^__^
         \  (oO)\_______
            (__)\       )\/\
             U  ||----w |
                ||     ||
```

### log


```javascript

cowlog.log(function(a,b){return a+b}, 1, true, "string",12.5);

```

```
 _____________________________________________________________________________________________________________________
(                                                                                                                     )
( 0 Beginnig ---                                                                                             )
( function (a,b){return a+b}                                                                                          )
( 0 End ---                                                                                                  )
(                                                                                                                     )
( 1 Beginnig ---                                                                                             )
( 1                                                                                                                   )
( 1 End ---                                                                                                  )
(                                                                                                                     )
( 2 Beginnig ---                                                                                             )
( true                                                                                                                )
( 2 End ---                                                                                                  )
(                                                                                                                     )
( 3 Beginnig ---                                                                                             )
( "string"                                                                                                            )
( 3 End ---                                                                                                  )
(                                                                                                                     )
( 4 Beginnig ---                                                                                             )
( 12.5                                                                                                                )
( 4 End ---                                                                                                  )
(                                                                                                                     )
( _-_-_-_-_-_-_-_-_-_-_-_                                                                                    )
( called from: /pwa/serviceworker/gulpfile.js:9:8                                                            )
( stack trace: /tmp/cowlog/15/d57c246542d360d4c17d35a689e067dbab5937c05a60e9e46950cc651598da_stack-trace.log )
( session log: /tmp/cowlog/df/f243fafad495715002ba3b4c8fa8545b97b11b2a214d23c93b9b4513656692_session.log     )
( file log: /tmp/cowlog/26/ebc124ddd894f7382e3f0a54e88f1f18396f217a365bb2b6c7dfe88b33d2f5_file.log           )
( logged at file: 2017-08-23T16:17:41.675Z                                                                   )
 ---------------------------------------------------------------------------------------------------------------------
  o
   o ..:::::::::.
    ::::::::::::::
   /. `::::::::::::
  O__,_:::::::::::'


```
### logf

```javascript

cowlog.logf(function(a,b){return a+b}, 1, true, "string",12.5);

```
```
_____________________________________________________________________________________________________________________
/                                                                                                                     \
| a Beginnig ---                                                                                             |
| 1                                                                                                                   |
| a End ---                                                                                                  |
|                                                                                                                     |
| b Beginnig ---                                                                                             |
| true                                                                                                                |
| b End ---                                                                                                  |
|                                                                                                                     |
| undefined Beginnig ---                                                                                     |
| "string"                                                                                                            |
| undefined End ---                                                                                          |
|                                                                                                                     |
| undefined Beginnig ---                                                                                     |
| 12.5                                                                                                                |
| undefined End ---                                                                                          |
|                                                                                                                     |
| _-_-_-_-_-_-_-_-_-_-_-_                                                                                    |
| called from: /pwa/serviceworker/gulpfile.js:9:8                                                            |
| stack trace: /tmp/cowlog/fe/5feb4abd9b6de769fe0cf4224fb2448bd109c6e339f87cf5fa08903f49f497_stack-trace.log |
| session log: /tmp/cowlog/05/35cd5ede8d4529a0c4bf1460b4afb6e983d49d4f73e65c66006f4fc93480bd_session.log     |
| file log: /tmp/cowlog/26/ebc124ddd894f7382e3f0a54e88f1f18396f217a365bb2b6c7dfe88b33d2f5_file.log           |
\ logged at file: 2017-08-23T16:15:34.884Z                                                                   /
 ---------------------------------------------------------------------------------------------------------------------
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
### die

```javascript

    cowlog.log('I Die Here')('die');
    cowlog.log(function(a,b){return a+b}, 1, true, "string",12.5)('die');

```
```
 _____________________________________________________________________________________________________________________
(                                                                                                                     )
( 0 Beginnig ---                                                                                             )
( "I Die Here"                                                                                                        )
( 0 End ---                                                                                                  )
(                                                                                                                     )
( _-_-_-_-_-_-_-_-_-_-_-_                                                                                    )
( called from: /pwa/serviceworker/gulpfile.js:9:8                                                            )
( stack trace: /tmp/cowlog/37/71768bff7c5c61f14b5678643aa73e25af556304cdb1623783a331b534ef85_stack-trace.log )
( session log: /tmp/cowlog/b4/2fb8c8b38fe3990dac4f9f1998bed997ad63eb6e5a2f92a238b596b788110d_session.log     )
( file log: /tmp/cowlog/26/ebc124ddd894f7382e3f0a54e88f1f18396f217a365bb2b6c7dfe88b33d2f5_file.log           )
( logged at file: 2017-08-23T16:25:38.024Z                                                                   )
 ---------------------------------------------------------------------------------------------------------------------
        o   ^__^
         o  (oO)\_______
            (__)\       )\/\
             U  ||----w |
                ||     ||

```

# last and return

```javascript

let returnValue = cowlog.log('test')('last')('return');
cowlog.log('another one', returnValue)('die');

```
```
_____________________________________________________________________________________________________________________
 _____________________________________________________________________________________________________________________
/                                                                                                                     \
| 0 Beginnig ---                                                                                             |
| "test"                                                                                                              |
| 0 End ---                                                                                                  |
|                                                                                                                     |
| _-_-_-_-_-_-_-_-_-_-_-_                                                                                    |
| called from: /pwa/serviceworker/gulpfile.js:9:26                                                           |
| stack trace: /tmp/cowlog/fa/6bff13ada60bb525597f231d6bb7df1a4451deb1df6b47d4a77abec0994c5e_stack-trace.log |
| session log: /tmp/cowlog/58/4e464ce6b402148f2cd243fdc86d15df61ce640da00493fa9fe229e3ec139f_session.log     |
| file log: /tmp/cowlog/26/ebc124ddd894f7382e3f0a54e88f1f18396f217a365bb2b6c7dfe88b33d2f5_file.log           |
\ logged at file: 2017-08-23T16:36:17.022Z                                                                   /
 ---------------------------------------------------------------------------------------------------------------------
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
 _____________________________________________________________________________________________________________________
/                                                                                                                     \
| 0 Beginnig ---                                                                                             |
| "another one"                                                                                                       |
| 0 End ---                                                                                                  |
|                                                                                                                     |
| 1 Beginnig ---                                                                                             |
| "test"                                                                                                              |
| 1 End ---                                                                                                  |
|                                                                                                                     |
| _-_-_-_-_-_-_-_-_-_-_-_                                                                                    |
| called from: /pwa/serviceworker/gulpfile.js:10:8                                                           |
| stack trace: /tmp/cowlog/0b/604cd293d87929294e59f7e893050e624406d9f25388497eefb1dfc93f1ca9_stack-trace.log |
| session log: /tmp/cowlog/58/4e464ce6b402148f2cd243fdc86d15df61ce640da00493fa9fe229e3ec139f_session.log     |
| file log: /tmp/cowlog/26/ebc124ddd894f7382e3f0a54e88f1f18396f217a365bb2b6c7dfe88b33d2f5_file.log           |
\ logged at file: 2017-08-23T16:36:17.036Z                                                                   /
 ---------------------------------------------------------------------------------------------------------------------
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

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
The following log entry is shown here because asked for it to show it again before the program exits
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------


 _____________________________________________________________________________________________________________________
/                                                                                                                     \
| 0 Beginnig ---                                                                                                      |
| "test"                                                                                                              |
| 0 End ---                                                                                                           |
|                                                                                                                     |
| _-_-_-_-_-_-_-_-_-_-_-_                                                                                    |
| called from: /pwa/serviceworker/gulpfile.js:9:26                                                           |
| stack trace: /tmp/cowlog/fa/6bff13ada60bb525597f231d6bb7df1a4451deb1df6b47d4a77abec0994c5e_stack-trace.log |
| session log: /tmp/cowlog/58/4e464ce6b402148f2cd243fdc86d15df61ce640da00493fa9fe229e3ec139f_session.log     |
| file log: /tmp/cowlog/26/ebc124ddd894f7382e3f0a54e88f1f18396f217a365bb2b6c7dfe88b33d2f5_file.log           |
\ logged at file: 2017-08-23T16:36:17.022Z                                                                   /
 ---------------------------------------------------------------------------------------------------------------------
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

### Stress test

```javascript

cowlog.log(cowlog.log('test', 'stuff')('last')('return'))('die');

```
```
 _____________________________________________________________________________________________________________________
/                                                                                                                     \
| 0 Beginnig ---                                                                                             |
| "test"                                                                                                              |
| 0 End ---                                                                                                  |
|                                                                                                                     |
| 1 Beginnig ---                                                                                             |
| "stuff"                                                                                                             |
| 1 End ---                                                                                                  |
|                                                                                                                     |
| _-_-_-_-_-_-_-_-_-_-_-_                                                                                    |
| called from: /pwa/serviceworker/gulpfile.js:10:19                                                          |
| stack trace: /tmp/cowlog/97/62e60b4999b65e8d13740a00eab256283f24c49a4084d58d5977e25fbe4f5d_stack-trace.log |
| session log: /tmp/cowlog/2c/9efcbbd59a9aad6176259a025eb88b33d481d93a12d37e5aa59c2d7dcc7bbd_session.log     |
| file log: /tmp/cowlog/26/ebc124ddd894f7382e3f0a54e88f1f18396f217a365bb2b6c7dfe88b33d2f5_file.log           |
\ logged at file: 2017-08-23T16:32:36.316Z                                                                   /
 ---------------------------------------------------------------------------------------------------------------------
        \   ^__^
         \  (oO)\_______
            (__)\       )\/\
             U  ||--WWW |
                ||     ||
 _____________________________________________________________________________________________________________________
/                                                                                                                     \
| 0 Beginnig ---                                                                                             |
| "stuff"                                                                                                             |
| 0 End ---                                                                                                  |
|                                                                                                                     |
| _-_-_-_-_-_-_-_-_-_-_-_                                                                                    |
| called from: /pwa/serviceworker/gulpfile.js:10:8                                                           |
| stack trace: /tmp/cowlog/75/f33d5eebac02034b1b8a6d410ea3b82f1445568ecb40e06482ff83ab48ce0f_stack-trace.log |
| session log: /tmp/cowlog/2c/9efcbbd59a9aad6176259a025eb88b33d481d93a12d37e5aa59c2d7dcc7bbd_session.log     |
| file log: /tmp/cowlog/26/ebc124ddd894f7382e3f0a54e88f1f18396f217a365bb2b6c7dfe88b33d2f5_file.log           |
\ logged at file: 2017-08-23T16:32:36.325Z                                                                   /
 ---------------------------------------------------------------------------------------------------------------------
        \   ^__^
         \  (oO)\_______
            (__)\       )\/\
             U  ||--WWW |
                ||     ||

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
The following log entry is shown here because asked for it to show it again before the program exits
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------


 _____________________________________________________________________________________________________________________
/                                                                                                                     \
| 0 Beginnig ---                                                                                                      |
| "test"                                                                                                              |
| 0 End ---                                                                                                           |
|                                                                                                                     |
| 1 Beginnig ---                                                                                                      |
| "stuff"                                                                                                             |
| 1 End ---                                                                                                           |
|                                                                                                                     |
| _-_-_-_-_-_-_-_-_-_-_-_                                                                                    |
| called from: /pwa/serviceworker/gulpfile.js:10:19                                                          |
| stack trace: /tmp/cowlog/97/62e60b4999b65e8d13740a00eab256283f24c49a4084d58d5977e25fbe4f5d_stack-trace.log |
| session log: /tmp/cowlog/2c/9efcbbd59a9aad6176259a025eb88b33d481d93a12d37e5aa59c2d7dcc7bbd_session.log     |
| file log: /tmp/cowlog/26/ebc124ddd894f7382e3f0a54e88f1f18396f217a365bb2b6c7dfe88b33d2f5_file.log           |
\ logged at file: 2017-08-23T16:32:36.316Z                                                                   /
 ---------------------------------------------------------------------------------------------------------------------
        \   ^__^
         \  (oO)\_______
            (__)\       )\/\
             U  ||--WWW |
                ||     ||

```
```
```
```
```
