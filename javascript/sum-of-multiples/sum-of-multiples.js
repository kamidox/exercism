function SumOfMultiples (factors) {
    'use strict';

    return {
        to: function (limit) {
            var ret = [];
            for (let i = 0; i < limit; i ++) {
                if (isFactorsOf(i)) {
                    ret.push(i);
                }
            }
            return ret.reduce((sum, elem) => {
                return sum + elem;
            }, 0);
        }
    };

    function isFactorsOf (num) {
        for (let i = 0; i < factors.length; i ++) {
            if (num % factors[i] === 0) {
                return true;
            }
        }
        return false;
    }
}

module.exports = SumOfMultiples;

