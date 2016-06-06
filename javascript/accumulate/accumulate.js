function accumulate (coll, mapfn) {
    'use strict';

    var ret = [];
    for (var i = 0; i < coll.length; i ++) {
        ret.push(mapfn(coll[i]));
    }
    return ret;
}

module.exports = accumulate;

