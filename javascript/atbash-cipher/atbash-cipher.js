function encode (txt) {
    'use strict';

    var plains = 'abcdefghijklmnopqrstuvwxyz';
    var cipher = 'zyxwvutsrqponmlkjihgfedcba';
    var chars = txt.toLowerCase().split('');
    chars = chars.filter(function (element) {
        return (/[a-z0-9]/.test(element));
    });
    chars = chars.map(function (element) {
        var idx = plains.indexOf(element);
        if (idx !== -1) {
            return cipher[idx];
        } else {
            return element;
        }
    });
    var sec = [];
    for (var i = 0; i < chars.length; i ++) {
        if (i !== 0 && i % 5 === 0) {
            sec.push(' ');
        }
        sec.push(chars[i]);
    }
    return sec.reduce(function (pval, cval) {
        return pval + cval;
    }, '');
}

exports.encode = encode;

