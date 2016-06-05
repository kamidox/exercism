function Binary (bval) {
    'use strict';

    var base = 2;

    return {
        toDecimal: function () {
            if (/[^10]/.test(bval)) {
                return 0;
            }

            var bits = bval.split('');
            return bits.reduce(function (pval, cval, idx, arr) {
                var power = Math.pow(base, (arr.length - idx - 1));
                return pval + parseInt(cval) * power;
            }, 0);
        }
    };
}

module.exports = Binary;
