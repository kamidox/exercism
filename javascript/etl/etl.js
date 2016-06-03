module.exports = function ETL() {
    'use strict';

    function sortedKeys (old) {
        var values = [];
        var keys = Object.keys(old);
        for (var i = 0; i < keys.length; i ++) {
            Array.prototype.push.apply(values, old[keys[i]]);
        }
        return values.sort().map(function (val) {
            return val.toLowerCase();
        });
    }

    function ValueOf (old, key) {
        var keys = Object.keys(old);
        key = key.toUpperCase();
        for (var i = 0; i < keys.length; i ++) {
            if (old[keys[i]].indexOf(key) !== -1) {
                return parseInt(keys[i]);
            }
        }
        return -1;
    }

    function transform (old) {
        var keys = sortedKeys(old);
        return keys.reduce(function functionName(sorted, key) {
            sorted[key] = ValueOf(old, key);
            return sorted;
        }, {});
    }

    return { transform: transform };
};
