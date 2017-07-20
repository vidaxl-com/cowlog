# Cowlog

A small wrapper around cowsay library so you can indentify your debug message easily on the console output.

## Usage
```javascript
let cowlog = require("@vidaxl/cowlog")`;
cowlog.log({a:'b'})`;
cowlog.log('message');
````
The first log will output stg like this (monospaced) 

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
