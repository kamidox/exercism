var numbers = {
    0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
    6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven',
    12: 'twelve', 13: 'thirdteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen',
    17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty', 30: 'thirty',
    40: 'forty', 50: 'fifty', 60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety'
};

var levels = {
    0: '',
    1: 'thousand',
    2: 'million',
    3: 'billion'
};

function numberParts (num) {
    'use strict';

    num = num.toString();
    var ret = [];
    var offset = -3;
    var len = 3;
    do {
        if (num.length + offset >= 0) {
            ret.unshift(num.substr(offset, len));
            offset -= len;
        } else {
            len += offset + num.length;
            offset = - num.length;
            ret.unshift(num.substr(offset, len));
            break;
        }
    } while (offset + len + num.length > 0);
    return ret;
}

function partToWords (part, idx, arr) {
    'use strict';
    var n = (Number)(part);
    var digitHundred = Math.floor(n / 100);
    var digitTen = Math.floor(n / 10) % 10;
    var digitOne = n % 10;

    var ret = '';
    if (digitHundred > 0) {
        ret += numbers[digitHundred] + ' ' + 'hundred';
    }
    if (digitTen > 0) {
        ret = ret ? (ret + ' '): ret;
        if (digitTen < 2) {
            ret += numbers[n % 100];
        } else {
            ret += numbers[digitTen * 10];
            if (digitOne > 0) {
                ret += '-' + numbers[digitOne];
            }
        }
    } else if (digitOne > 0) {
        ret = ret ? (ret + ' '): ret;
        ret += numbers[digitOne];
    }

    if (ret) {
        var level = arr.length - idx - 1;
        ret += ' ' + levels[level];
    }
    return ret;
}

function inEnglish (num) {
    'use strict';

    if (num < 0 || num > 999999999999) {
        throw new Error('Number must be between 0 and 999,999,999,999.');
    }
    if (num <= 20) {
        return numbers[num];
    }

    var parts = numberParts(num);
    parts = parts.map(partToWords);
    parts = parts.filter(function (c) {
        return (Boolean)(c);
    });
    return parts.join(' ').trim();
}

exports.inEnglish = inEnglish;

