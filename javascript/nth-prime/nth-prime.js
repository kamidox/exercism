/**
 * return true if p is a prime number, otherwise false.
 *
 * @param {Number} p - the number to be judged
 * @param {Array} primes - list or sorted primes
 * @return {Boolean} - true if p is a prime number
 */
function isPrime (p, primes) {
    'use strict';

    for (var i = 0; i < primes.length; i ++) {
        if (p % primes[i] === 0) {
            return false;
        }
    }
    return true;
}

/**
 * return the next prime number which is larger than primes[primes.length - 1]
 *
 * @param {Array} primes - list or sorted primes
 * @return {int} - the next prime number
 */
function nextPrime(primes) {
    'use strict';

    var p = primes[primes.length - 1];
    do {
        p = p + 1;
    } while (!isPrime(p, primes));
    return p;
}

/**
 * return the nth prime number in prime number sequence.
 *
 * @param {Number} idx - the index of prime number
 * @return {Number} - the nth prime number
 */
function nthPrime (idx) {
    'use strict';

    if (idx <= 0) {
        throw new Error('Prime is not possible');
    }
    var primes = [2, 3, 5, 7];
    if (idx <= primes.length) {
        return primes[idx - 1];
    }

    for (var i = primes.length; i < idx; i ++) {
        primes.push(nextPrime(primes));
    }
    return primes[idx - 1];
}

exports.nth = nthPrime;

