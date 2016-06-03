function toRoman (n) {
    'use strict';

    var romanCharTable = {
        1: 'IV',
        10: 'XL',
        100: 'CD',
        1000: 'M'
    };

    function numberToDigits (n) {
        var digits = [];
        while (n > 0) {
            digits.push(n % 10);
            n = Math.floor(n / 10);
        }
        return digits.reverse();
    }

    function digitToRoman (digit, level) {
        var romans = [];
        var i;
        if (digit <= 3) {
            for (i = 0; i < digit; i ++) {
                romans.push(romanCharTable[level][0]);
            }
        } else if (digit === 4) {
            romans.push(romanCharTable[level]);
        } else if (digit === 5) {
            romans.push(romanCharTable[level][1]);
        } else if (digit <= 8) {
            romans.push(romanCharTable[level][1]);
            for (i = 0; i < digit - 5; i ++) {
                romans.push(romanCharTable[level][0]);
            }
        } else if (digit === 9) {
            romans.push(romanCharTable[level][0]);
            romans.push(romanCharTable[level * 10][0]);
        }

        return romans.reduce(function (pVal, cVal) {
            return pVal + cVal;
        }, '');
    }

    var digits = numberToDigits(n);
    var romans = digits.map(function (element, index, array) {
        var level = element * Math.pow(10, (array.length - index - 1));
        return digitToRoman(element, level);
    });
    return romans.reduce(function (pVal, cVal) {
        return pVal + cVal;
    }, '');
}

module.exports = toRoman;

