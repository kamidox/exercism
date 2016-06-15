module.exports = function (params) {
    'use strict';

    this.maxFactor = params.maxFactor;
    this.minFactor = params.minFactor || 1;

    this.generate = function () {
        var palindromes = {};
        var palindromesValues = [];

        for (var i = this.minFactor; i <= this.maxFactor; i ++) {
            for (var k = this.minFactor; k <= this.maxFactor; k ++) {
                var result = i * k;
                if (!isPalindromesNumber(result)) {
                    continue;
                }

                var factors = [i, k].sort(function (a, b) { return a >= b; });
                if (palindromes[result] === undefined) {
                    palindromesValues.push(result);
                    palindromes[result] = [[i, k]];
                } else {
                    if (!factorsInArray(palindromes[result], factors)) {
                        palindromes[result].push(factors);
                    }
                }
            }
        }
        this.palindromes = palindromes;
        this.palindromesValues = palindromesValues;
    };

    this.largest = function () {
        var val = Math.max.apply(null, this.palindromesValues);
        return {value: val, factors: this.palindromes[val]};
    };

    this.smallest = function () {
        var val = Math.min.apply(null, this.palindromesValues);
        return {value: val, factors: this.palindromes[val]};
    };

    function isPalindromesNumber (num) {
        var digits = num.toString().split('');
        return num.toString() === digits.reverse().join('');
    }

    function factorsInArray (arr, e) {
        return arr.find(function (c) {
            return c[0] === e[0] && c[1] === e[1];
        });
    }
};

