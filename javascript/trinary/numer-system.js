function NumberSystem(val, base, reInvalidDigits) {
    'use strict';

    return {
        toDecimal: function () {
            if (reInvalidDigits.test(val)) {
                return 0;
            }

            var bits = val.split('');
            return bits.reduce(function (pval, cval, idx, arr) {
                var power = Math.pow(base, (arr.length - idx - 1));
                return pval + parseInt(cval) * power;
            }, 0);
        }
    };
}

module.exports = NumberSystem;
