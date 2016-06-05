function PrimeFactorsFor (n) {
    'use strict';

    var result = [];
    var i = 2;
    while (i <= n) {
        if (n % i === 0) {
            result.push(i);
            n = n / i;
            i = 2;
        } else {
            i ++;
        }
    }
    return result;
}

exports.for = PrimeFactorsFor;

