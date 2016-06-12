function NumberSystem(val, base, reInvalidDigits) {
    'use strict';

    function charToInt(cval) {
        // to support hex
        var ch = cval.charCodeAt(0);
        if (ch >= 48 && ch <= 57) {
            return ch - 48;
        } else if (ch >= 97 && ch <= 102) {
            return ch - 97 + 10;
        } else {
            throw new Error('Unknow number system.');
        }
    }

    return {
        toDecimal: function () {
            if (reInvalidDigits.test(val)) {
                return 0;
            }

            var bits = val.split('');
            return bits.reduce(function (pval, cval, idx, arr) {
                var power = Math.pow(base, (arr.length - idx - 1));
                return pval + charToInt(cval) * power;
            }, 0);
        }
    };
}

module.exports = NumberSystem;
