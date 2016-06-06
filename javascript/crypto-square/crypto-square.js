function Crypto (msg) {
    'use strict';

    return {
        normalizePlaintext: normalizePlaintext,
        size: size,
        plaintextSegments: plaintextSegments,
        ciphertext: ciphertext
    };

    function normalizePlaintext () {
        var chars = msg.toLowerCase().split('').map(function (c) {
            return /[a-z0-9]/.test(c) ? c : '';
        });
        return chars.reduce(function (pval, cval) {
            return pval + cval;
        }, '');
    }

    function size() {
        var normalizeMsg = normalizePlaintext();
        var s = Math.sqrt(normalizeMsg.length);
        var f = Math.floor(s);
        return s % f === 0 ? s : f + 1;
    }

    function plaintextSegments () {
        var ret = [];
        var normalizeMsg = normalizePlaintext();
        var s = size();
        for (var i = 0; i < normalizeMsg.length; i += s) {
            ret.push(normalizeMsg.substr(i, s));
        }
        return ret;
    }

    function ciphertext () {
        var ret = [];
        var segs = plaintextSegments();
        var r = segs.length;
        var c = segs[0].length;
        for (var i = 0; i < c; i ++) {
            for (var j = 0; j < r; j ++) {
                ret.push(segs[j][i] ? segs[j][i] : '');
            }
        }
        return ret.reduce(function (pval, cval) {
            return pval + cval;
        }, '');
    }
}

module.exports = Crypto;

