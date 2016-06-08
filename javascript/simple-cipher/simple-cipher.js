function SimpleCipher (key) {
    'use strict';

    if (typeof key === 'undefined') {
        this.key = randomKey(100);
    } else {
        if (!key || /[A-Z0-9]/.test(key)) {
            throw new Error('Bad key');
        }
        this.key = key;
    }
}

var code = 'abcdefghijklmnopqrstuvwxyz';

function randomKey (len) {
    var ret = new Array(len);
    for (var i = 0; i < len; i ++) {
        ret[i] = code[Math.floor(Math.random() * code.length)];
    }
    return ret.reduce(function (pval, cval) {
        return pval + cval;
    }, '');
}

// the length of key must larger the length of txt
SimpleCipher.prototype.encode = function (txt) {
    'use strict';

    var key = this.key;
    var chars = txt.split('').map(function (c, index) {
        var idx = code.indexOf(c) + code.indexOf(key[index]);
        return code[idx % code.length];
    });
    return chars.reduce(function (pval, cval) {
        return pval + cval;
    }, '');
};

SimpleCipher.prototype.decode = function (sec) {
    'use strict';

    var key = this.key;
    var chars = sec.split('').map(function (c, index) {
        var offset = code.indexOf(c) - code.indexOf(key[index]);
        if (offset < 0) {
            offset += code.length;
        }
        return code[offset];
    });
    return chars.reduce(function (pval, cval) {
        return pval + cval;
    }, '');
};

module.exports = SimpleCipher;

