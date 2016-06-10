function Squares (num) {
    'use strict';

    function range (val) {
        var ret = new Array(val);
        for (var i = 0; i < val; i ++) {
            ret[i] = i + 1;
        }
        return ret;
    }

    function sumOfSquares (val) {
        console.log('call sumOfSquares');
        var r = range(val);
        return r.reduce(function (pval, cval) {
            return pval + Math.pow(cval, 2);
        }, 0);
    }

    function squareOfSums (val) {
        console.log('call squareOfSums');
        var r = range(val);
        var sum = r.reduce(function (pval, cval) {
            return pval + cval;
        }, 0);
        return Math.pow(sum, 2);
    }

    console.log('call constructor');
    return {
        squareOfSums: squareOfSums(num),
        sumOfSquares: sumOfSquares(num),
        difference: squareOfSums(num) - sumOfSquares(num)
    };
}

module.exports = Squares;

