# Cowlog

A small wrapper around cowsay library so you can indentify your debug message easily on the console output.

## Usage
### Logging a plain object
```javascript
let cowlog = require("@vidaxl/cowlog")`;
cowlog.log({a:'b'})`;
````
This will output stg like this (monospaced) 
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
### Logging multiple parameters

```javascript
cowlog.log(function(a,b){return a+b}, 1, true, "string",12.5);
```

```
 _____________________________________

(                                     )
( 0 Beginnig ---                      )
( function (a,b){return a+b}          )
( 0 End ---                           )
(                                     )
( 1 Beginnig ---                      )
( 1                                   )
( 1 End ---                           )
(                                     )
( 2 Beginnig ---                      )
( true                                )
( 2 End ---                           )
(                                     )
( 3 Beginnig ---                      )
( "string"                            )
( 3 End ---                           )
(                                     )
( 4 Beginnig ---                      )
( 12.5                                )
( 4 End ---                           )
(                                     )
 -------------------------------------
        o
         o
          )__(
         '|oO|'________/
          |__|         |
           U ||"""""""||
             ||       ||

```

```
```

```
```

