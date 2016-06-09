function Triplet (a, b, c) {
    'use strict';

    return {
        sum: function () {
            return a + b + c;
        },

        product: function () {
            return a * b * c;
        },

        isPythagorean: function () {
            var arr = [a, b, c];
            arr.sort(function (v1, v2) {
                return v1 > v2;
            });
            return (Math.pow(arr[0], 2) + Math.pow(arr[1], 2)) === Math.pow(arr[2], 2);
        }
    };
}

Triplet.where = function (cond) {
    var minFactor = cond.minFactor;
    var maxFactor = cond.maxFactor;
    var sum = cond.sum;
    var start;

    if (typeof minFactor === 'undefined') {
        start = 1;
    } else {
        start = minFactor;
    }

    if (typeof maxFactor === 'undefined') {
        maxFactor = -1;
    }
    if (typeof sum === 'undefined') {
        sum = -1;
    }

    if (maxFactor === -1 && sum > 0) {
        maxFactor = sum;
    }

    if (maxFactor === -1) {
        return [];
    }

    var ret = [];
    for (var i = start; i < maxFactor; i ++) {
        for (var j = i; j < maxFactor; j ++) {
            for (var k = j; k <= maxFactor; k ++) {
                if (sum < 0 || (i + j + k) === sum) {
                    var t = new Triplet(i, j, k);
                    if (t.isPythagorean()) {
                        ret.push(t);
                    }
                }
            }
        }
    }
    return ret;
};

module.exports = Triplet;

