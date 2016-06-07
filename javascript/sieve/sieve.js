function Sieve (limit) {
    'use strict';

    function primeRange () {
        var ret = [];
        for (var i = 2; i <= limit; i ++) {
            ret.push(i);
        }
        return ret;
    }

    function primes () {
        var ret = primeRange();
        var idx = 0;
        var i = 0;
        var len = ret.length;
        for (idx = 0; idx < len; idx ++) {
            if (ret[idx] === 0) {
                continue;
            }
            for (i = idx + 1; i < len; i ++) {
                if (ret[i] !== 0 && ret[i] % ret[idx] === 0) {
                    ret[i] = 0;
                }
            }
        }
        return ret.filter(function (c) {
            return c !== 0 ? true : false;
        });
    }

    return {
        primes: primes()
    };
}

module.exports = Sieve;

