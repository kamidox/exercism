function Luhn (num) {
    return {
        checkDigit: checkDigit(num),
        addends: addends(num),
        checksum: checksum(num),
        valid: valid(num)
    };
}

var digits = {0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9};

function checkDigit (val) {
    var s = '' + val;
    return digits[s[s.length - 1]];
}

function addends (val) {
    var s = '' + val;
    var len = s.length;
    return s.split('').map(function (c, i) {
        var needDouble = (len - i) % 2 === 0;
        var double = 2 * digits[c];
        double = double >= 10 ? double - 9 : double;
        return needDouble ? double : digits[c];
    });
}

function checksum (val) {
    return addends(val).reduce(function (pval, cval) {
        return pval + cval;
    }, 0);
}

function valid (val) {
    var csum = checksum(val);
    return csum % 10 === 0;
}

Luhn.create = function (val) {
    var nval = 10 * val;
    var csum = checksum(nval);
    if (csum % 10 === 0) {
        return nval;
    } else {
        return nval + (10 - (csum % 10));
    }
};

module.exports = Luhn;

