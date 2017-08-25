'use strict';
const sha256 = require('sha256');

module.exports = function(db) {
    return function (data) {
        let hash = sha256(data);

        let hashDataDb = db.get('hash_data');
        // let insert = hashDataDb
        //     .findLast(function (hash_data) {
        //         return hash.data = hash_data;
        //     })

        //console.log(insert)
        var hash_data = {hash: hash, data: data};
        hashDataDb.push(hash_data).write()
        console.log(hash_data, hash, data);
        return hash;
    }
}
