exports.log =  function (message) {
    const cowsay = require("cowsay");
    let msg = message

    function isObject(val) {
        if (val === null) {
            return false;
        }
        return ( (typeof val === 'function') || (typeof val === 'object') );
    }

    if (isObject(message)) {
        const stringifyObject = require('stringify-object');
        msg = stringifyObject(message, {
            indent: '  ',
            singleQuotes: false
        });
    }

    console.log(cowsay.say({
        text: msg,
        e: "oO",
        T: "U "
    }));
};
