function Series (num) {
    'use strict';

    this._num = num;
}

function partition (arr, len, offset) {
    'use strict';

    if (arr.length < len) {
        throw new Error('Slice size is too big.');
    }
    var ret = [];
    for (var i = 0; i + len <= arr.length; i += offset) {
        ret.push(arr.slice(i, i + len));
    }
    return ret;
}

Series.prototype.largestProduct = function (len) {
    'use strict';

    if (len < 0 || /[^0123456789]/.test(this._num)) {
        throw new Error('Invalid input.');
    }
    if (len === 0) {
        return 1;
    }
    var nums = this._num.split('');
    var parts = partition(nums, len, 1);
    return parts.reduce(function (pval, cval) {
        var product = 1;
        for (var i = 0; i < cval.length; i ++) {
            product = product * parseInt(cval[i]);
        }
        return Math.max(pval, product);
    }, 0);
};

module.exports = Series;

