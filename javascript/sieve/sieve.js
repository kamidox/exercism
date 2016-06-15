/*!
 * Sieve Primes JavaScript Library
 *
 * This library perform primes calculate by using Sieve algorithm
 * For more infomation please refer to https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
 *
 * @example
 * var SievePrimes = require('./sieve/sieve');
 * var primes = new Sieve(10);
 * console.log(primes.primes);
 *
 * Copyright 2016 Joey Huang
 * Released under the MIT license
 * https://github.com/kamidox/exercism
 */
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
        /**
         * Return all primes under limit
         *
         * @returns Array of all primes under limit
         */
        primes: primes()
    };
}

module.exports = Sieve;

